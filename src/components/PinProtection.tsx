import { useState, useRef, useEffect } from 'react';
import './PinProtection.css';
import PronosticsView from './PronosticsView';

interface PinProtectionProps {
  correctPin?: string;
}

export default function PinProtection({ correctPin = '1991' }: PinProtectionProps) {
  const [pin, setPin] = useState(['', '', '', '']);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Vérifier si déjà déverrouillé (session storage)
  useEffect(() => {
    const unlocked = sessionStorage.getItem('pronostics_unlocked');
    if (unlocked === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    // Accepter seulement les chiffres
    if (value && !/^\d$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setError(false);

    // Auto-focus sur le prochain input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Vérifier le code si tous les chiffres sont entrés
    if (newPin.every(digit => digit !== '')) {
      const enteredPin = newPin.join('');
      if (enteredPin === correctPin) {
        setIsUnlocked(true);
        sessionStorage.setItem('pronostics_unlocked', 'true');
      } else {
        setError(true);
        setShake(true);
        setTimeout(() => {
          setShake(false);
          setPin(['', '', '', '']);
          inputRefs.current[0]?.focus();
        }, 500);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Retour arrière
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4);
    if (/^\d{1,4}$/.test(pastedData)) {
      const newPin = [...pin];
      for (let i = 0; i < pastedData.length; i++) {
        newPin[i] = pastedData[i];
      }
      setPin(newPin);

      // Focus sur le dernier chiffre rempli ou vérifier
      if (pastedData.length === 4) {
        if (pastedData === correctPin) {
          setIsUnlocked(true);
          sessionStorage.setItem('pronostics_unlocked', 'true');
        } else {
          setError(true);
          setShake(true);
          setTimeout(() => {
            setShake(false);
            setPin(['', '', '', '']);
            inputRefs.current[0]?.focus();
          }, 500);
        }
      } else {
        inputRefs.current[pastedData.length]?.focus();
      }
    }
  };

  // Si déverrouillé, afficher le contenu
  if (isUnlocked) {
    return <PronosticsView />;
  }

  // Sinon, afficher l'écran de PIN
  return (
    <div className="pin-protection-overlay">
      <div className={`pin-protection-container ${shake ? 'shake' : ''}`}>
        <div className="pin-lock-icon">🔒</div>
        <h2 className="pin-title">Accès Protégé</h2>
        <p className="pin-subtitle">Entrez le code PIN pour accéder aux pronostics</p>

        <div className="pin-inputs" onPaste={handlePaste}>
          {pin.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`pin-input ${error ? 'error' : ''} ${digit ? 'filled' : ''}`}
              autoFocus={index === 0}
            />
          ))}
        </div>

        {error && (
          <p className="pin-error">Code incorrect. Veuillez réessayer.</p>
        )}

        <a href="/" className="pin-back-link">
          ← Retour à l'accueil
        </a>
      </div>
    </div>
  );
}
