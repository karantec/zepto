import  { useState, useRef, useEffect } from 'react';


// State variables
const InputBox = () => {
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [highlightedChip, setHighlightedChip] = useState(null);
  const [isListVisible, setListVisible] = useState(false);
  const inputRef = useRef(null);


  // Initial data for the items
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialItems = [
    { id: 1, label: 'Nick Giannopoulos', email: 'nick@example.com', image: 'https://i.pravatar.cc/40?u=1' },
    { id: 2, label: 'John Doe', email: 'john@example.com', image: 'https://i.pravatar.cc/40?u=2' },
    { id: 3, label: 'Jane Smith', email: 'jane@example.com', image: 'https://i.pravatar.cc/40?u=3' },
    { id: 4, label: 'Alice Johnson', email: 'alice@example.com', image: 'https://i.pravatar.cc/40?u=4' },
    { id: 5, label: 'Bob Williams', email: 'bob@example.com', image: 'https://i.pravatar.cc/40?u=5' },
    { id: 6, label: 'Eva Davis', email: 'eva@example.com', image: 'https://i.pravatar.cc/40?u=6' },
    { id: 7, label: 'Michael Brown', email: 'michael@example.com', image: 'https://i.pravatar.cc/40?u=7' },
    { id: 8, label: 'Sophie Turner', email: 'sophie@example.com', image: 'https://i.pravatar.cc/40?u=8' },
    { id: 9, label: 'Alex Johnson', email: 'alex@example.com', image: 'https://i.pravatar.cc/40?u=9' },
    { id: 10, label: 'Grace Smith', email: 'grace@example.com', image: 'https://i.pravatar.cc/40?u=10' },
  ];

  // Effect to filter items based on chips and update the list
  useEffect(() => {
    setFilteredItems(initialItems.filter(item => !chips.find(chip => chip.label === item.label)));
  }, [chips, initialItems]);
  
  // Handler for input change
  const handleInputChange = event => {
    const value = event.target.value;
    setInputValue(value);

    if (value.trim() === '') {
      setFilteredItems(initialItems.filter(item => !chips.find(chip => chip.label === item.label)));
      setHighlightedChip(chips.length > 0 ? chips.length - 1 : null);
    } else {
      setFilteredItems(initialItems.filter(item => item.label.toLowerCase().includes(value.toLowerCase())));
      setHighlightedChip(null);
    }
  };
 // Handler for clicking on an item in the list

  const handleItemClick = item => {
    const newChips = [...chips, item];
    setChips(newChips);
    setInputValue('');
    setHighlightedChip(null);
    setListVisible(false);
  };

  // Handler for removing a chip
  const handleChipRemove = id => {
    const updatedChips = chips.filter(chip => chip.id !== id);
    setChips(updatedChips);
    setHighlightedChip(null);
  };
// Handler for key down events in the input
  const handleInputKeyDown = event => {
    if (event.key === 'Backspace' && inputValue === '' && chips.length > 0) {
      if (highlightedChip === null) {
        // Highlight the last chip
        setHighlightedChip(chips.length - 1);
      } else {
        // Remove the highlighted chip
        handleChipRemove(chips[highlightedChip].id);
      }
    }
  };
// Handler for clicking inside the input
  const handleInputClick = () => {
    setListVisible(true);
  };

  // Handler for clicking outside the component to close the list
  const handleOutsideClick = event => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setListVisible(false);
    }
  };
// Effect to add an outside click listener when the component mounts
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
// Cleanup the listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="chip-input relative w-full">
     {/* Display the chips */}
      <div className="chips-container flex flex-wrap mb-2 w-full">
        {chips.map((chip, index) => (
          <div
            key={chip.id}
            className={`chip bg-gray-300 border border-purple-600 rounded-full  px-2 py-1 flex items-center mr-2 mb-2 ${
              highlightedChip === index ? 'bg-yellow-300' : ''
            }`}
          >
            <img src={chip.image} alt={chip.label} className="w-6 h-6 rounded-full mr-2" />
            {chip.label} 
            <span className="chip-remove ml-2 cursor-pointer" onClick={() => handleChipRemove(chip.id)}>
              X
            </span>
          </div>
        ))}
      </div>
      {/* Input field */}
      <input
        type="text"
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onClick={handleInputClick}
        placeholder="Pick User"
        className="border-none border-b-2 border-gray-400 w-full py-1 focus:outline-none focus:border-blue-500"
      />
      {/* Display the filtered items as a list */}
      {isListVisible && (
        <ul className="item-list list-none p-0 m-0 mt-2 max-h-40 overflow-y-auto absolute bg-white border border-gray-300 rounded w-full">
          {filteredItems.map((item, index) => (
            <li
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`cursor-pointer flex items-center px-2 py-1 hover:bg-gray-200 ${
                highlightedChip === index ? 'bg-yellow-300' : ''
              }`}
            >
              <img src={item.image} alt={item.label} className="w-6 h-6 rounded-full mr-2" />
              <span>{item.label}</span> ({item.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputBox;
