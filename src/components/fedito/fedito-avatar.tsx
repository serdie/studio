'use client';

import { cn } from '@/lib/utils';
import styles from './fedito-avatar.module.css';

interface FeditoAvatarProps {
  state?: 'idle' | 'thinking' | 'talking' | 'happy';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Fedito Avatar Component
 * Mascota/chatbot animado para CEOE-FEDETO
 *
 * Estados:
 * - idle: Flotación suave con respiración
 * - thinking: Rotación suave + partículas orbitales
 * - talking: Animación de boca + ondas de sonido
 * - happy: Salto con squash & stretch + partículas
 */
export function FeditoAvatar({ state = 'idle', className, size = 'md' }: FeditoAvatarProps) {
  const sizeClasses = {
    sm: styles.sizeSm,
    md: styles.sizeMd,
    lg: styles.sizeLg,
  };

  return (
    <div
      className={cn(
        styles.fedito,
        styles[state],
        sizeClasses[size],
        className
      )}
    >
      {/* Partículas para estado thinking */}
      {state === 'thinking' && (
        <div className={styles.orbitParticles}>
          <div className={styles.orbitParticle} />
          <div className={styles.orbitParticle} />
          <div className={styles.orbitParticle} />
        </div>
      )}

      {/* Ondas de sonido para estado talking */}
      {state === 'talking' && (
        <div className={styles.soundWaves}>
          <div className={styles.soundWave} />
          <div className={styles.soundWave} />
          <div className={styles.soundWave} />
        </div>
      )}

      {/* Partículas para estado happy */}
      {state === 'happy' && (
        <div className={styles.happyParticles}>
          <div className={styles.happyParticle} />
          <div className={styles.happyParticle} />
          <div className={styles.happyParticle} />
          <div className={styles.happyParticle} />
        </div>
      )}
    </div>
  );
}
