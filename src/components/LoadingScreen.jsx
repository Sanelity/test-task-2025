import './LoadingScreen.css'


export function LoadingScreen() {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <span className="loading-text">Please wait!</span>
      </div>
    );
  }