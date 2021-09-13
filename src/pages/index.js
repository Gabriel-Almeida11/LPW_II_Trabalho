import React, {useState, useEffect} from "react";

import "./styles.css";

function Home() {
  const [periodo, setPeriodo] = useState('')
  const [disciplina, setDisciplina] = useState('')
  const [professor, setProfessor]= useState('')
  const[cargaH, setCargaH] = useState('')
  const[aluno, setAluno]= useState([])


  function handleAddClient(event){
    event.preventDefault();
    const data={
      id: new Date().getTime(),
      periodo,
      disciplina,
      professor,
      cargaH
      
    }
    console.log(data)
    setAluno([...aluno, data])
    setPeriodo('')
    setDisciplina('')
    setProfessor('')
    setCargaH('')

  }

  function handleDelete(id){
    setAluno(aluno.filter(alunos=> alunos.id !== id))
  }

  useEffect(()=>{
    function loadData(){
      const storageclients= localStorage.getItem('@cadaluno:aluno')
      if(storageclients){
        setAluno(JSON.parse(storageclients))
      }
    }
    loadData()

  }, [])

  useEffect(()=>{
    function saveData(){
      localStorage.setItem('@cadaluno:aluno',JSON.stringify(aluno))
    }
    saveData()
  }, [aluno])

  return (
    <div className="page">
      <form className="cadastro" onSubmit={handleAddClient}>
      <select
      className="select"
      name="Periodo"
      value={periodo}
      onChange={(event)=> setPeriodo(event.target.value)}>

        <option selected disabled value="">Selecione o Período</option>
        <option value ="1º Período">1º Período</option>
        <option value ="2º Período">2º Período</option>
        <option value ="3º Período">3º Período</option>
        <option value ="4º Período">4º Período</option>
        <option value ="5º Período">5º Período</option>
        <option value ="6º Período">6º Período</option>
        <option value ="7º Período">7º Período</option>
        <option value ="8º Período">8º Período</option>

      </select>
      
      <input
          name="disciplina"
          type="text"
          placeholder="Digite sua disciplina"
          value={disciplina}
          onChange={(event) => setDisciplina(event.target.value)}
     />

      <select
      className="select"
      name="professor"
      value={professor}
      onChange={(event)=> setProfessor(event.target.value)}>

        <option selected disabled value="">Selecione o Professor</option>
        <option value ="Marcio">Marcio</option>
        <option value ="Luiz">Luiz</option>
        <option value ="Marcelo">Marcelo</option>
        <option value ="Andre">Andre</option>
        <option value ="Helena">Helena</option>
        <option value ="Maria">Maria</option>
        <option value ="José">José</option>

      </select>

      <input
          name="cargaH"
          type="text"
          placeholder="Digite sua Carga Horária"
          value={cargaH}
          onChange={(event) => setCargaH(event.target.value)}
     />



        <button type="submit">Enviar</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Período</th>
            <th>Disciplina</th>
            <th>Professor</th>
            <th>Carga Horária</th>
            <th colSpan={1}>Gerenciamento</th>
          </tr>
        </thead>
        <tbody>
       
          
          {aluno.map(alunos =>(
            <tr key={alunos.id}>
              <td>{alunos.periodo} </td>
              <td>{alunos.disciplina}</td>
              <td>{alunos.professor}</td>
              <td>{alunos.cargaH}</td>
              <td>
                <button 
                className="Excluir"
                onClick={()=> handleDelete(alunos.id)}
                >
                  Excluir
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { Home };
