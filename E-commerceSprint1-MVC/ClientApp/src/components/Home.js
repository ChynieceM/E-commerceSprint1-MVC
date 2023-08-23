import React, { useState, useEffect } from 'react';
import {
    Dropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    Row
} from 'reactstrap';
import axios from 'axios';

export function Home() {
    const [categories, setCategories] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:5135/categories');
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }

        fetchData();
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(prevState => !prevState);
    }

    return (
        <div>
            <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle nav caret>
                    Fetch Categories
                </DropdownToggle>
                <DropdownMenu>
                    {categories.map((category, index) => (
                        <React.Fragment key={index}>
                            <DropdownItem>{category.Name}</DropdownItem>
                            {index !== categories.length - 1 && <DropdownItem divider />}
                        </React.Fragment>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
