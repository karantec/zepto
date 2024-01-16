import "./Pascal.css"
const generatePascalsTriangle = numRows => {
    const triangle = [];
  
    for (let i = 0; i < numRows; i++) {
      const row = [];
      let val = 1;
  
  
      for (let j = 1; j < numRows - i; j++) {
        row.push(null); // Placeholder for space
      }
  
      for (let k = 0; k <= i; k++) {
        row.push(val);
        val = val * (i - k) / (k + 1);
      }
  
      triangle.push(row);
    }
  
    return triangle;
  };

const PascalTra = () => {
  const numRows = 10;
  const pascalsTriangle = generatePascalsTriangle(numRows);

  return (
    <div>
      <h2 style={{display:"flex",justifyContent:"center"}}>Pascal Triangle Fibannaci:</h2>
      {pascalsTriangle.map((row, rowIndex) => (
        <div key={rowIndex}  className="styles">
          {row.map((val, colIndex) => (
            <span key={colIndex}  className="element-space">
              {val !== null ? `${val}   ` : '      '}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PascalTra;
