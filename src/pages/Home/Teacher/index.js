import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import * as aggregateByCategory from "../../../utils/aggregateByCategory.js";

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
        <List component="div" sx={{pr: 4, pl: 4}}>
          {categories.map((category, index) => (
            <div key={index}>
              <Typography variant="h5" component="h6" >
                {category[0]}
              </Typography>
              {category[1].map((test, index) => (
                <Typography key={index}>
                  {`${test.name} - ${test.pdfUrl} (${test.disciplineName})`}
                </Typography>
              ))}
            </div>
          ))}

          {categories.length === 0 && (
            <ListItemText primary="There are no tests!" />
          )}
        </List>
      </Collapse>
    </>
  );
}
