import React, { useState } from "react";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import './fillipform.css';

const DropdownQuestionTable = ({ question, onAddItem }) => {
    const [selectedOption, setSelectedOption] = useState("");

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleAddClick = () => {
        if (selectedOption) {
            onAddItem(selectedOption);
            setSelectedOption("");
        }
    };

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <div>
                <FormControl>
                    <div
                        style={{
                            marginTop: '-50px',
                            marginLeft: '10px'
                        }}
                    >
                        <Select
                            sx={{
                                width: 250,
                                height: 50,
                            }}
                            displayEmpty
                            value={selectedOption}
                            onChange={handleChange}
                        >
                            <MenuItem value="" disabled>
                                {question.label}
                            </MenuItem>
                            {question.options.map((option, index) => (
                                <MenuItem key={index} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </FormControl>
            </div>
            <div style={{marginTop:'-72px'}}>
                <button
                    className="fillip-submit-button"
                    style={{
                        marginTop: '-55px',
                        marginLeft: '30px'
                    }}
                    onClick={handleAddClick}
                >
                    Add
                </button>
            </div>
        </div>
    );
};

export default DropdownQuestionTable;
