import React from 'react';
import { FileX } from 'lucide-react';
import './EmptyState.css';

const EmptyState = () => {
  return (
    <div className="empty-state-container">
      <div className="empty-state-content">
        <FileX size={64} className="empty-state-icon" />
        <h2 className="empty-state-title">Không có hóa đơn nào</h2>
        <p className="empty-state-description">
          Hiện tại, bạn chưa có hóa đơn điện nước nào được tạo.
        </p>
        <div className="empty-state-actions">
          <button className="empty-state-button">
            Liên hệ quản lý
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;