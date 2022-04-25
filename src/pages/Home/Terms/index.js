import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import Disciplines from "../Disciplines";

export default function Terms({ handleClick, index, currentListItem, number, disciplines }) {
  const [currentDiscipline, setCurrentDiscipline] = useState(null);

  function changeDiscipline(item) {
    if (currentDiscipline === item) {
      setCurrentDiscipline(null);
    } else if (currentDiscipline === null) {
      setCurrentDiscipline(item);
    } else {
      setCurrentDiscipline(item);
    }
  }

  return (
    <>
      <ListItemButton onClick={() => handleClick(index)}>
        <ListItemText primary={number} />
        {currentListItem === index ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={currentListItem === index} timeout="auto" unmountOnExit>
        <List component="div" sx={{pl: 2, pr: 2}}>
          {disciplines.map((discipline, index) => (
            <Disciplines
              key={discipline.id}
              {...discipline}
              index={index}
              number={number}
              changeDiscipline={changeDiscipline}
              currentDiscipline={currentDiscipline}
            />
          ))}

          {disciplines.length === 0 && (
            <ListItemText primary="Não há disciplinas neste período" />
          )}
        </List>
      </Collapse>
    </>
  );
}