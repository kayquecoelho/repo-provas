import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import * as aggregateByCategory from "../../../utils/aggregateByCategory.js";

export default function Disciplines({
  changeDiscipline,
  currentDiscipline,
  index,
  name,
  classes,
}) {
  const tests = aggregateByCategory.terms(classes);

  return (
    <>
      <ListItemButton onClick={() => changeDiscipline(index)}>
        <ListItemText primary={name} />
        {currentDiscipline === index ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={currentDiscipline === index} timeout="auto" unmountOnExit>
        <List component="div" sx={{ pl: 4, pr: 4 }}>
          {tests.map((test, index) => (
            <div key={index}>
              <Typography variant="h5" component="h6">
                {test[0]}
              </Typography>
              {test[1].map((t, index) => (
                <Typography key={index}>
                  {`${t.name} - ${t.pdfUrl} (${t.teacher})`}
                </Typography>
              ))}
            </div>
          ))}
          {tests.length === 0 && "There are no tests"}
        </List>
      </Collapse>
    </>
  );
}