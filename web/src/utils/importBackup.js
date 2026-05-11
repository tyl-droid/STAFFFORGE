export function importBackup(file, callback) {
  const reader = new FileReader();

  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      callback(data);
    } catch {
      alert("Invalid backup file.");
    }
  };

  reader.readAsText(file);
}
