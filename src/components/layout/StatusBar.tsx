export function StatusBar() {
  return (
    <div className="status-bar" aria-hidden>
      <span>[ QUANTEX® ] / AI SOLUTIONS</span>
      <span className="status-bar__geo">BEIRUT 33.89°N 35.50°E</span>
      <span className="status-bar__rev">REV 2.6 / UNIT D-01</span>
      <span className="status-bar__live">
        <i /> ASSISTANT ONLINE
      </span>
    </div>
  );
}
