import React from 'react';

export default function TaskPopup({ onClose }) {
  // SVG for the User Avatar
  const UserSvg = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#2b4c7e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  return (
    <>
      <style>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .popup-container {
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          width: 100%;
          max-width: 650px;
          padding: 30px;
          position: relative;
        }

        /* Header Area */
        .popup-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 15px;
        }

        .popup-header h2 {
          margin: 0;
          font-size: 22px;
          font-weight: 500;
          color: #333;
        }

        .popup-header h2.title-blue {
          color: #2b4c7e;
          font-weight: 600;
        }

        .status-dot-large {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background-color: #facc15;
          border: 2px solid white;
          box-shadow: 0 0 0 1px #e5e7eb;
        }

        .popup-divider {
          border: 0;
          border-top: 1px solid #e5e7eb;
          margin-bottom: 20px;
        }

        /* Task Information Section */
        .section-heading {
          font-size: 16px;
          color: #333;
          font-weight: 600;
          margin-bottom: 15px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1.5fr 1.5fr 1fr;
          gap: 20px;
          margin-bottom: 25px;
        }

        .info-label {
          font-size: 12px;
          color: #333;
          margin-bottom: 8px;
        }

        .user-block {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .avatar-circle {
          width: 40px;
          height: 40px;
          background-color: #f3f4f6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-name {
          font-weight: 600;
          color: #111;
          font-size: 13px;
        }

        .user-subtext {
          font-size: 11px;
          color: #666;
          margin-top: 2px;
        }

        .date-text {
          font-weight: 500;
          color: #111;
          font-size: 14px;
          margin-top: 8px;
        }

        /* Key Dates Box */
        .key-dates-box {
          background-color: #f3f4f6;
          border-radius: 8px;
          padding: 15px 20px;
          margin-bottom: 25px;
        }

        .key-dates-title {
          font-size: 14px;
          font-weight: 600;
          color: #333;
          margin-bottom: 10px;
        }

        .key-dates-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .due-date-text {
          font-size: 14px;
          color: #333;
        }

        .due-date-val {
          color: #dc2626;
          font-weight: 600;
          margin: 0 4px;
        }

        .days-left {
          font-size: 12px;
          color: #666;
        }

        .status-block {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #333;
        }

        .status-dot-small {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #facc15;
        }

        /* Bottom Split Section */
        .bottom-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-bottom: 20px;
        }

        .desc-text {
          font-size: 13px;
          color: #333;
          line-height: 1.5;
        }

        .comments-textarea {
          width: 100%;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          padding: 12px;
          font-size: 13px;
          resize: none;
          outline: none;
          box-sizing: border-box;
          min-height: 80px;
        }

        .comments-textarea:focus {
          border-color: #2b4c7e;
        }

        /* Buttons */
        .action-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 15px;
        }

        .btn {
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-outline {
          background-color: white;
          border: 1px solid #d1d5db;
          color: #333;
        }

        .btn-outline:hover {
          background-color: #f9fafb;
        }

        .btn-solid {
          background-color: #0a192f;
          border: 1px solid #0a192f;
          color: white;
        }

        .btn-solid:hover {
          background-color: #112240;
        }
      `}</style>

      <div className="popup-overlay" onClick={onClose}>
        <div className="popup-container" onClick={e => e.stopPropagation()}>
          
          {/* Header */}
          <div className="popup-header">
            <h2>Task Name :</h2>
            <h2 className="title-blue">UI design</h2>
            <div className="status-dot-large"></div>
          </div>
          <hr className="popup-divider" />

          {/* Task Information */}
          <div className="section-heading">Task information</div>
          <div className="info-grid">
            <div>
              <div className="info-label">Assigned by:</div>
              <div className="user-block">
                <div className="avatar-circle"><UserSvg /></div>
                <div>
                  <div className="user-name">Gotha bataya</div>
                  <div className="user-subtext">Assigned on 19/12/2026</div>
                </div>
              </div>
            </div>
            <div>
              <div className="info-label">Assigned to:</div>
              <div className="user-block">
                <div className="avatar-circle"><UserSvg /></div>
                <div>
                  <div className="user-name">Moda bataya</div>
                  <div className="user-subtext">Designer</div>
                </div>
              </div>
            </div>
            <div>
              <div className="info-label">Created on:</div>
              <div className="date-text">13/05/2026</div>
            </div>
          </div>

          {/* Key Dates Box */}
          <div className="key-dates-box">
            <div className="key-dates-title">Key Dates</div>
            <div className="key-dates-row">
              <div className="due-date-text">
                Due Date: <span className="due-date-val">25/12/2026</span> 
                <span className="days-left">( 3 days left )</span>
              </div>
              <div className="status-block">
                <span>Status:</span>
                <div className="status-dot-small"></div>
                <span>Ongoing</span>
              </div>
            </div>
          </div>

          {/* Description & Comments */}
          <div className="bottom-grid">
            <div>
              <div className="section-heading" style={{ marginBottom: '8px' }}>Description</div>
              <div className="desc-text">Design the final pages</div>
            </div>
            <div>
              <div className="section-heading" style={{ marginBottom: '8px' }}>Comments</div>
              <textarea 
                className="comments-textarea" 
                defaultValue="Use pastel colors"
              ></textarea>
            </div>
          </div>

          {/* Buttons */}
          <div className="action-buttons">
            <button className="btn btn-outline" onClick={onClose}>Add comment</button>
            <button className="btn btn-solid" onClick={onClose}>Update Status</button>
          </div>

        </div>
      </div>
    </>
  );
}