import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import * as aggregateByCategory from "../../../utils/aggregateByCategory.js";
import Test from "../Test/index.js";

export default function Disciplines({
  changeDiscipline,
  currentDiscipline,
  index,
  name,
  classes,
}) {
  const categories = aggregateByCategory.terms(classes);

  return (
    <>
      <ListItemButton onClick={() => changeDiscipline(index)}>
        <ListItemText primary={name} />
        {currentDiscipline === index ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={currentDiscipline === index} timeout="auto" unmountOnExit>
        <List component="div" sx={{ pl: 4, pr: 4 }}>
          {categories.map((category, index) => (
            <Test key={index} category={category} />
          ))}

          {categories.length === 0 && "There are no tests"}
        </List>
      </Collapse>
    </>
  );
}
