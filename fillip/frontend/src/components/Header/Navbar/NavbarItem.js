import React from "react";
import { Link } from "react-router-dom";
import navbarData from "../../../data/Navbar/navbar";
import "./NavbarItem.css";



function NavbarItem(props) {
  return navbarData.map((item) => (
    <li
      key={item.id}
      className={item.subMenu || item.megaMenu ? "has-submenu" : ""}
    >
      <Link to={`${process.env.PUBLIC_URL + item.link}`} className="link">{item.title}</Link>
      {(() => {
        if (item.subMenu) {
          return (
            <ul className="submenu-nav" >
            {item.subMenu.map((subItem, index) => {
              // Calculate the row and column index based on the index of the submenu item
              const rowIndex = Math.floor(index / 5);
              const colIndex = index % 5;
          
              // Calculate the CSS class for the column based on the column index
              const colClass = `col-${colIndex + 1}`;
              const rowClass = `row-${rowIndex + 1}`;
          
              return (
                <li key={index} className={`${colClass} ${rowClass}`} style={{
                  // color:'brown',
                  padding: '1px',
                  width: '100%',
                  
                }}>
                  <Link to={`${process.env.PUBLIC_URL + subItem.link}`}>
                    {subItem.title}
                  </Link>
                </li>
              );
            })}
          </ul>
          
          );
        }

        if (item.megaMenu) {
          return (
            <ul className="submenu-nav submenu-nav-mega dropdown-menu">
              {item.megaMenu.map((megaItem, indx) => (
                <li key={indx} className="mega-menu-item">
                  <Link to={megaItem.link}>{megaItem.title}</Link>
                  <ul>
                    {megaItem.lists.map((listItem, idx) => {
                      return (
                        <li key={idx}>
                          <Link
                            to={`${process.env.PUBLIC_URL + listItem.link}`}
                          >
                            {listItem.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          );
        }
      })()}
    </li>
  ));
}
export default NavbarItem;
