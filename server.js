const express = require('express');

const app = express();

app.use(express.static(__dirname));

app.get('/api', (req,res)=>{

  res.json({
    status:'PlanEdu online'
  });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{

  console.log(
    'Servidor rodando na porta ' + PORT
  );

});