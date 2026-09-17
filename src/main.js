// Main JavaScript logic for Nova Mobile App (Phase 5 Update)

document.addEventListener('DOMContentLoaded', () => {
  // Screen elements map
  const screens = {
    'screen-dashboard': document.getElementById('screen-dashboard'),
    'screen-eligibility-intro': document.getElementById('screen-eligibility-intro'),
    'screen-step1': document.getElementById('screen-step1'),
    'screen-step2': document.getElementById('screen-step2'),
    'screen-step2-manual': document.getElementById('screen-step2-manual'),
    'screen-step3': document.getElementById('screen-step3'),
    'screen-loader': document.getElementById('screen-loader'),
    'screen-error': document.getElementById('screen-error'),
    'screen-success': document.getElementById('screen-success')
  };

  const topTabs = document.querySelectorAll('.screen-tab');
  const bottomNav = document.getElementById('app-bottom-nav');
  const toastNotification = document.getElementById('success-toast');
  const idErrorModal = document.getElementById('id-error-modal');
  let toastTimer = null;
  let faceAlignmentTimers = [];

  // Screen Switcher Helper
  function showScreen(targetScreenId) {
    Object.keys(screens).forEach(id => {
      if (screens[id]) {
        if (id === targetScreenId) {
          screens[id].classList.add('active');
        } else {
          screens[id].classList.remove('active');
        }
      }
    });

    // Update top bar tabs
    topTabs.forEach(tab => {
      if (tab.dataset.screen === targetScreenId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Control Bottom Navigation Visibility (ONLY ON HOMEPAGE / DASHBOARD)
    if (bottomNav) {
      if (targetScreenId === 'screen-dashboard') {
        bottomNav.style.display = 'flex';
      } else {
        bottomNav.style.display = 'none';
      }
    }

    // Scroll active screen content to top
    if (screens[targetScreenId]) {
      screens[targetScreenId].scrollTop = 0;
    }

    // Reset Step 2 sub-states when entering Step 2
    if (targetScreenId === 'screen-step2') {
      resetStep2State();
    }

    // Trigger Toast & Face Alignment Sequence when entering Step 3
    if (targetScreenId === 'screen-step3') {
      if (toastNotification) triggerSuccessToast();
      runFaceAlignmentSequence();
    }
  }

  // Toast Notification Handler
  function triggerSuccessToast() {
    if (toastTimer) clearTimeout(toastTimer);
    if (toastNotification) {
      toastNotification.classList.remove('show');
      setTimeout(() => {
        toastNotification.classList.add('show');
        toastTimer = setTimeout(() => {
          toastNotification.classList.remove('show');
        }, 3500);
      }, 300);
    }
  }

  // ==================== STEP 2: CAPTURE ID & REVIEW FLOW ====================
  const idLiveState = document.getElementById('id-capture-live-state');
  const idReviewState = document.getElementById('id-capture-review-state');
  const captureBtn = document.getElementById('btn-capture-id');
  const cameraFrame = document.querySelector('.camera-frame-card');
  const idReviewContinueBtn = document.getElementById('btn-id-review-continue');
  const idReviewRetakeBtn = document.getElementById('btn-id-review-retake');
  const idReviewBackBtn = document.getElementById('btn-id-review-back');

  function resetStep2State() {
    if (idLiveState) idLiveState.classList.remove('hidden');
    if (idReviewState) idReviewState.classList.add('hidden');
  }

  // Click "Capture ID" -> Scan animation -> Transition to ID Review State
  if (captureBtn && cameraFrame) {
    captureBtn.addEventListener('click', () => {
      captureBtn.disabled = true;
      captureBtn.textContent = 'Scanning ID...';
      cameraFrame.style.transition = 'box-shadow 0.4s ease';
      cameraFrame.style.boxShadow = '0 0 30px #E0AD0F';

      setTimeout(() => {
        captureBtn.style.backgroundColor = '#16A34A';
        captureBtn.textContent = '✓ ID Captured';
        cameraFrame.style.boxShadow = '0 0 30px #16A34A';

        setTimeout(() => {
          captureBtn.disabled = false;
          captureBtn.style.backgroundColor = 'var(--primary)';
          captureBtn.textContent = 'Capture ID';
          cameraFrame.style.boxShadow = 'none';

          // Show Review State
          if (idLiveState) idLiveState.classList.add('hidden');
          if (idReviewState) idReviewState.classList.remove('hidden');
        }, 900);
      }, 1200);
    });
  }

  // Retake clicked -> Return to Live Viewfinder
  [idReviewRetakeBtn, idReviewBackBtn].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        resetStep2State();
      });
    }
  });

  // Click "Looks great! Continue" on ID Review -> Show "Just a moment..." Loader -> Step 3 Selfie Screen
  if (idReviewContinueBtn) {
    idReviewContinueBtn.addEventListener('click', () => {
      showScreen('screen-loader');
      setTimeout(() => {
        showScreen('screen-step3');
      }, 2000);
    });
  }

  // ==================== STEP 3: FACE ALIGNMENT & SELFIE REVIEW FLOW ====================
  const arcTop = document.getElementById('arc-top');
  const arcRight = document.getElementById('arc-right');
  const arcBottom = document.getElementById('arc-bottom');
  const arcLeft = document.getElementById('arc-left');
  const selfieInstruction = document.getElementById('selfie-instruction');
  const takeSelfieBtn = document.getElementById('btn-take-selfie');
  const viewfinderState = document.getElementById('selfie-viewfinder-state');
  const reviewState = document.getElementById('selfie-review-state');
  const selfieReviewContinueBtn = document.getElementById('btn-selfie-review-continue');
  const retakeBtn = document.getElementById('btn-retake-selfie');
  const retakeBackBtn = document.getElementById('btn-retake-back');

  function clearFaceTimers() {
    faceAlignmentTimers.forEach(t => clearTimeout(t));
    faceAlignmentTimers = [];
  }

  function runFaceAlignmentSequence() {
    clearFaceTimers();

    if (viewfinderState) viewfinderState.classList.remove('hidden');
    if (reviewState) reviewState.classList.add('hidden');

    [arcTop, arcRight, arcBottom, arcLeft].forEach(arc => {
      if (arc) arc.classList.remove('active');
    });

    if (takeSelfieBtn) takeSelfieBtn.disabled = true;
    if (selfieInstruction) selfieInstruction.textContent = 'Ensure good lighting';

    // Stage 1 (0.0s): Top Arc Gold
    if (arcTop) arcTop.classList.add('active');

    // Stage 2 (1.4s): Top + Right Arc Gold
    faceAlignmentTimers.push(setTimeout(() => {
      if (arcRight) arcRight.classList.add('active');
      if (selfieInstruction) selfieInstruction.textContent = 'Look directly at the camera';
    }, 1400));

    // Stage 3 (2.8s): ALL 4 Arcs Gold (Face placed properly!)
    faceAlignmentTimers.push(setTimeout(() => {
      if (arcBottom) arcBottom.classList.add('active');
      if (arcLeft) arcLeft.classList.add('active');
      if (selfieInstruction) selfieInstruction.textContent = 'Face placed properly';
      if (takeSelfieBtn) takeSelfieBtn.disabled = false;
    }, 2800));
  }

  if (takeSelfieBtn) {
    takeSelfieBtn.addEventListener('click', () => {
      if (viewfinderState) viewfinderState.classList.add('hidden');
      if (reviewState) reviewState.classList.remove('hidden');
    });
  }

  [retakeBtn, retakeBackBtn].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        runFaceAlignmentSequence();
      });
    }
  });

  // Click "Looks great! Continue" on Selfie Review -> Show "Just a moment..." Loader -> Verification Approved Screen
  if (selfieReviewContinueBtn) {
    selfieReviewContinueBtn.addEventListener('click', () => {
      showScreen('screen-loader');
      setTimeout(() => {
        showScreen('screen-success');
      }, 2000);
    });
  }

  // ==================== "WE COULDN'T READ YOUR ID" ERROR MODAL ====================
  const toggleIdErrorTab = document.getElementById('btn-toggle-id-error-tab');
  const modalRetakeBtn = document.getElementById('btn-modal-retake');
  const modalManualBtn = document.getElementById('btn-modal-manual');

  function openIdErrorModal() {
    if (idErrorModal) idErrorModal.classList.remove('hidden');
  }

  function closeIdErrorModal() {
    if (idErrorModal) idErrorModal.classList.add('hidden');
  }

  if (toggleIdErrorTab) {
    toggleIdErrorTab.addEventListener('click', () => {
      showScreen('screen-step2');
      openIdErrorModal();
    });
  }

  if (modalRetakeBtn) {
    modalRetakeBtn.addEventListener('click', () => {
      closeIdErrorModal();
      showScreen('screen-step2');
      resetStep2State();
    });
  }

  if (modalManualBtn) {
    modalManualBtn.addEventListener('click', () => {
      closeIdErrorModal();
      showScreen('screen-step2-manual');
    });
  }

  // ==================== TOP CONTROL BAR & ROUTING LISTENERS ====================
  topTabs.forEach(tab => {
    if (tab.dataset.screen) {
      tab.addEventListener('click', () => {
        closeIdErrorModal();
        showScreen(tab.dataset.screen);
      });
    }
  });

  document.querySelectorAll('.nav-to-dash').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeIdErrorModal();
      showScreen('screen-dashboard');
    });
  });

  document.querySelectorAll('.nav-to-eligibility').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeIdErrorModal();
      showScreen('screen-eligibility-intro');
    });
  });

  document.querySelectorAll('.nav-to-step1').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeIdErrorModal();
      showScreen('screen-step1');
    });
  });

  document.querySelectorAll('.nav-to-step2').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeIdErrorModal();
      showScreen('screen-step2');
    });
  });

  document.querySelectorAll('.nav-to-step2-manual').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeIdErrorModal();
      showScreen('screen-step2-manual');
    });
  });

  document.querySelectorAll('.nav-to-step3').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeIdErrorModal();
      showScreen('screen-step3');
    });
  });

  document.querySelectorAll('.nav-to-error').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeIdErrorModal();
      showScreen('screen-error');
    });
  });

  document.querySelectorAll('.nav-to-success').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeIdErrorModal();
      showScreen('screen-success');
    });
  });

  // Balance Eye Toggle
  const eyeBtn = document.getElementById('toggle-balance-eye');
  const balanceVal = document.getElementById('balance-val');
  let isBalanceVisible = true;

  if (eyeBtn && balanceVal) {
    eyeBtn.addEventListener('click', () => {
      isBalanceVisible = !isBalanceVisible;
      if (isBalanceVisible) {
        balanceVal.textContent = '0.00';
        eyeBtn.innerHTML = `
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
          </svg>
        `;
      } else {
        balanceVal.textContent = '••••••••';
        eyeBtn.innerHTML = `
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        `;
      }
    });
  }

  // Dynamic Manual ID Entry (Exact 11 digits!)
  const idTypeSelect = document.getElementById('manual-id-type');
  const idNumberInput = document.getElementById('manual-id-number');
  const loadingRow = document.getElementById('manual-loading');
  const fetchedFieldsGroup = document.getElementById('manual-fetched-fields');
  const confirmBtn = document.getElementById('btn-manual-confirm');
  let fetchTimer = null;

  function handleManualInputCheck() {
    const selectedType = idTypeSelect ? idTypeSelect.value : '';
    const idVal = idNumberInput ? idNumberInput.value.trim() : '';

    if (selectedType && idVal.length === 11) {
      if (fetchTimer) clearTimeout(fetchTimer);
      if (loadingRow) loadingRow.classList.remove('hidden');

      fetchTimer = setTimeout(() => {
        if (loadingRow) loadingRow.classList.add('hidden');
        if (fetchedFieldsGroup) fetchedFieldsGroup.classList.remove('hidden');
        if (confirmBtn) confirmBtn.disabled = false;
      }, 1400);
    } else {
      if (loadingRow) loadingRow.classList.add('hidden');
      if (fetchedFieldsGroup) fetchedFieldsGroup.classList.add('hidden');
      if (confirmBtn) confirmBtn.disabled = true;
    }
  }

  if (idTypeSelect && idNumberInput) {
    idTypeSelect.addEventListener('change', handleManualInputCheck);
    idNumberInput.addEventListener('input', handleManualInputCheck);
  }

  // Device Frame Toggle (Phone Frame vs Full Screen View)
  const toggleFrameBtn = document.getElementById('toggle-frame-btn');
  const mobileFrame = document.querySelector('.mobile-frame');

  if (toggleFrameBtn && mobileFrame) {
    toggleFrameBtn.addEventListener('click', () => {
      mobileFrame.classList.toggle('full-screen-mode');
      if (mobileFrame.classList.contains('full-screen-mode')) {
        toggleFrameBtn.textContent = '📱 Mobile Frame';
      } else {
        toggleFrameBtn.textContent = '🖥️ Full Screen';
      }
    });
  }
});
