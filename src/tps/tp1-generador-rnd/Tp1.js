import {
  Button,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Histograma from "../../components/Histograma/Histograma";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import { apiHistograma, VARIABLES_KEYS } from "../../constants";
import "./Tp1.css";

export const Tp1 = () => {
  const [variables, setVariables] = useState({});
  const [tableRows, setTableRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [marcasClase, setMarcasClase] = useState([]);
  const [frecuencias, setFrecuencias] = useState([]);

  const handleChange = (event, key) => {
    const newVariables = { ...variables, [key]: event.target.value };
    setVariables(newVariables);
  };

  const renderInputs = () => {
    return (
      <>
        <div className="input">
          <TextField
            id={VARIABLES_KEYS.N}
            label="Tamaño (N)"
            variant="outlined"
            value={variables?.varN}
            className="input"
            type="number"
            onChange={(event) => handleChange(event, VARIABLES_KEYS.N)}
          ></TextField>
        </div>
        <div className="input">
          <TextField
            id={VARIABLES_KEYS.A}
            label="A"
            variant="outlined"
            value={variables?.varA}
            className="input"
            type="number"
            onChange={(event) => handleChange(event, VARIABLES_KEYS.A)}
          ></TextField>
        </div>
        <div className="input">
          <TextField
            id={VARIABLES_KEYS.M}
            label="M"
            className="input"
            variant="outlined"
            value={variables?.varM}
            type="number"
            onChange={(event) => handleChange(event, VARIABLES_KEYS.M)}
          ></TextField>
        </div>
        <div className="input">
          <TextField
            id={VARIABLES_KEYS.C}
            label="C"
            className="input"
            variant="outlined"
            value={variables?.varC}
            type="number"
            onChange={(event) => handleChange(event, VARIABLES_KEYS.C)}
          ></TextField>
        </div>
        <div className="input">
          <TextField
            id={VARIABLES_KEYS.K}
            label="K"
            className="input"
            variant="outlined"
            value={variables?.varK}
            type="number"
            onChange={(event) => handleChange(event, VARIABLES_KEYS.K)}
          ></TextField>
        </div>
        <div className="input">
          <TextField
            id={VARIABLES_KEYS.SEED}
            label="Seed"
            variant="outlined"
            value={variables?.seed}
            type="number"
            onChange={(event) => handleChange(event, VARIABLES_KEYS.SEED)}
          ></TextField>
        </div>
        <div className="input">
          <Select
            id={VARIABLES_KEYS.INTERVAL}
            value={variables?.interval}
            label="Intervalo"
            onChange={(event) => handleChange(event, VARIABLES_KEYS.INTERVAL)}
          >
            <MenuItem value={"5"}>5</MenuItem>
            <MenuItem value={"8"}>8</MenuItem>
            <MenuItem value={"10"}>10</MenuItem>
            <MenuItem value={"12"}>12</MenuItem>
          </Select>
        </div>
      </>
    );
  };

  function createData({
    frecuencia,
    frecuenciaAcumulada,
    inferior,
    intervalo,
    marcaClase,
    proporcion,
    proporcionAcumulada,
    superior,
  }) {
    return {
      frecuencia,
      frecuenciaAcumulada,
      inferior,
      intervalo,
      marcaClase,
      proporcion,
      proporcionAcumulada,
      superior,
    };
  }

  const parseResponse = (intervalos) => {
    const newRows = intervalos?.map((row) => createData(row));
    setTableRows(newRows);
    obtenerMarcasClase(intervalos);
    obtenerFrecuencias(intervalos);
  };

  const obtenerMarcasClase = (intervalos) => {
    const arrayMarcas = intervalos.map((row) => row?.marcaClase);
    setMarcasClase(arrayMarcas);
  };

  const obtenerFrecuencias = (intervalos) => {
    const arrayFrecuencias = intervalos.map((row) => parseInt(row?.frecuencia));
    console.log(arrayFrecuencias);
    setFrecuencias(arrayFrecuencias);
  };

  const generateHistogram = () => {
    setLoading(true);
    fetch(apiHistograma, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        n: variables?.[VARIABLES_KEYS.N],
        intervalos: variables?.[VARIABLES_KEYS.INTERVAL],
        seed: variables?.[VARIABLES_KEYS.SEED],
        mod: variables?.[VARIABLES_KEYS.M],
        multiplicador: variables?.[VARIABLES_KEYS.A],
        incremento: variables?.[VARIABLES_KEYS.C],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        parseResponse(data?.tabla?.intervalos);
        setLoading(false);
      });
  };

  const renderTable = () => {
    return (
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Table de randoms">
            <TableHead>
              <TableRow>
                <TableCell align="center">Límite inferior</TableCell>
                <TableCell align="center">Límite superior</TableCell>
                <TableCell align="center">Marca de clase</TableCell>
                <TableCell align="center">Frecuencia</TableCell>
                <TableCell align="center">Frecuencia acumulada</TableCell>
                <TableCell align="center">Proporción</TableCell>
                <TableCell align="center">Proporción acumulada</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableRows?.map((row) => (
                <TableRow
                  key={row.marcaClase}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {row.inferior}
                  </TableCell>
                  <TableCell align="center">{row.superior}</TableCell>
                  <TableCell align="center">{row.marcaClase}</TableCell>
                  <TableCell align="center">{row.frecuencia}</TableCell>
                  <TableCell align="center">
                    {row.frecuenciaAcumulada}
                  </TableCell>
                  <TableCell align="center">{row.proporcion}</TableCell>
                  <TableCell align="center">
                    {row.proporcionAcumulada}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

  return (
    <div className="container">
      <div className="headerContainer">
        <div className="title">Simulación</div>
        <div className="title">Trabajo práctico 1</div>
      </div>
      <div className="inputContainers">{renderInputs()}</div>
      <Button variant="outlined" onClick={generateHistogram}>
        Generar Aleatorios
      </Button>
      {loading ? <LoadingAnimation /> : renderTable()}
      <Histograma
        title="Histograma de Frecuencias"
        xAxis={marcasClase}
        data1={frecuencias}
      />
    </div>
  );
};
