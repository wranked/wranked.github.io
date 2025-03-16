export default function LoadingSpinner() {
    return (
      <div style={styles.spinnerContainer}>
        <div style={styles.spinner}></div>
      </div>
    );
  };
  
  const styles = {
    spinnerContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100px",
    },
    spinner: {
      width: "40px",
      height: "40px",
      border: "4px solid rgba(0, 0, 0, 0.1)",
      borderTop: "4px solid #333",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
  };

  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(
    "@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }",
    styleSheet.cssRules.length
  )
  