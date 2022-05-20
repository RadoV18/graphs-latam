import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import Title from "../components/Title";
import Card from "../components/Card";
import { useHistory } from "react-router-dom";
import "../Styles/home.css";

const Home = ({ deletePoppers }) => {
    useEffect(() => {
        deletePoppers();
    }, [deletePoppers]);

    const history = useHistory();

    const openGraphs = () => {
        history.push("/grafos/main");
    };

    const openJohnson = () => {
        history.push("/grafos/johnson");
    };

    const openAsignacion = () => {
        history.push("/grafos/asignacion");
    };

    const openTransporte = () => {
        history.push("/grafos/transporte");
    };

    // Sort
    const openSelectionSort = () => {
        history.push("/sort/selection");
    };

    const openInsertionSort = () => {
        history.push("/sort/insertion");
    };

    const openBubbleSort = () => {
        history.push("/sort/bubble");
    };

    const openMergeSort = () => {
        history.push("/sort/merge");
    };

    const openShellSort = () => {
        history.push("/sort/shell");
    };

    const openTrees = () => {
        history.push("/arboles");
    };

    const openDijstra = () => {
        history.push("/dijstra");
    };

    const openKruskal = () => {
        history.push("/kruskal");
    };

    return (
        <div>
            <Header title={"Implementación  de  Algoritmos"} logo={""} />
            <Title text={"Grafos"} />
            <div className="card-wrapper" style={{ paddingBottom: "1rem" }}>
                <Card
                    subtitle="Generación de Grafos"
                    img="/img/Card/grafos.png"
                    text="Representación de los grafos aplicados a la empresa LATAM"
                    buttonText="Grafos"
                    onClick={openGraphs}
                />
                <Card
                    subtitle="Johnson"
                    img="/img/Card/johnson.png"
                    text="Algoritmo de Johnson"
                    buttonText="Johnson"
                    onClick={openJohnson}
                />
                <Card
                    subtitle="Asignación"
                    img="/img/Card/asignacion.png"
                    text="Algoritmo de Asignación"
                    buttonText="Asignación"
                    onClick={openAsignacion}
                />
                <Card
                    subtitle="Transporte"
                    img="/img/Card/transporte.png"
                    text="Algoritmo de Transporte"
                    buttonText="Transporte"
                    onClick={openTransporte}
                />
            </div>
            <Title text={"Algoritmos de Ordenamiento"} />
            <div className="card-wrapper" style={{ paddingBottom: "5rem" }}>
                <Card
                    subtitle="Selection Sort"
                    img="/img/Card/selection_sort.png"
                    text="Representación de los grafos aplicados a la empresa LATAM"
                    buttonText="Selection Sort"
                    onClick={openSelectionSort}
                />

                <Card
                    subtitle="Insertion Sort"
                    img="/img/Card/insertion_sort.png"
                    text="Representación de los grafos aplicados a la empresa LATAM"
                    buttonText="Insertion Sort"
                    onClick={openInsertionSort}
                />
                <Card
                    subtitle="Bubble Sort"
                    img="/img/Card/bubble_sort.png"
                    text="Representación de los grafos aplicados a la empresa LATAM"
                    buttonText="Bubble Sort"
                    onClick={openBubbleSort}
                />

                <Card
                    subtitle="Merge Sort"
                    img="/img/Card/merge_sort.png"
                    text="Representación de los grafos aplicados a la empresa LATAM"
                    buttonText="Merge Sort"
                    onClick={openMergeSort}
                />


                <Card
                    subtitle="Shell Sort"
                    img="/img/Card/shell_sort.png"
                    text="Representación de los grafos aplicados a la empresa LATAM"
                    buttonText="Shell Sort"
                    onClick={openShellSort}
                />

            </div>
            <Title text={"Árboles Binarios"} />

            <div className="card-wrapper" style={{ paddingBottom: "5rem" }}>
                <Card
                    subtitle="Árboles Binarios"
                    img="/img/Card/arboles.png"
                    text="Representación de los árboles binarios"
                    buttonText="Árboles"
                    onClick={openTrees}
                />
            </div>

            <Title text={"Dijstra"} />


            <div className="card-wrapper" style={{ paddingBottom: "5rem" }}>
                <Card
                    subtitle="Dijkstra"
                    img="/img/Card/dijstra.jpg"
                    text="Representación de Dijkstra"
                    buttonText="Dijkstra"
                    onClick={openDijstra}
                />
            </div>

            <Title text={"Kruskal"} />


            <div className="card-wrapper" style={{ paddingBottom: "5rem" }}>
                <Card
                    subtitle="Kruskal"
                    img="/img/Card/kruskal.png"
                    text="Representación de algoritmo Kruskal"
                    buttonText="Kruskal"
                    onClick={openKruskal}
                />
            </div>



        </div>
    );
};

export default Home;
