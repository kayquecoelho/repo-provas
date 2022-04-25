import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import * as aggregateByCategory from "../../../utils/aggregateByCategory.js";
import Test from "../Test/index.js";

export default function Teachers({
  handleClick,
  index,
  currentListItem,
  name,
  disciplineTeacher,
}) {
  const categories = aggregateByCategory.teachers(disciplineTeacher);

  return (
    <>
      <ListItemButton onClick={() => handleClick(index)}>
        <ListItemText primary={name} />
        {currentListItem === index ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={currentListItem === index} timeout="auto" unmountOnExit>
        <List component="div" sx={{ pr: 4, pl: 4 }}>
          {categories.map((category, index) => (
            <Test key={index} category={category} />
          ))}

          {categories.length === 0 && (
            <ListItemText primary="There are no tests!" />
          )}
        </List>
      </Collapse>
    </>
  );
}
