import React from 'react';

interface AlarmBannerProps {
  message: string;
  visible: boolean;
  onAcknowledge: () => void;
}

export const AlarmBanner: React.FC<AlarmBannerProps> = ({ message, visible, onAcknowledge }) => {
  if (!visible) return null;

  return (
    <div className="alarm-banner">
      <div className="alarm-banner-message">{message}</div>
      <button className="alarm-banner-button" onClick={onAcknowledge}>
        Acknowledge
      </button>
    </div>
  );
};

export default AlarmBanner;

