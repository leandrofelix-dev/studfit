"use client";

import React, { useState } from "react";
import { AddAluno } from "./add-aluno";
import { Button, Input } from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";

interface Student {
  name: string;
  peso: string;
  altura: string;
  email: string;
  phone: string;
}

interface ListaPublicaProps {
  waitList: Student[];
}

const ListaPublica: React.FC<ListaPublicaProps> = ({ waitList }) => {
  const [students, setStudents] = useState<Student[]>(waitList);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddStudent = (newStudent: Student) => {
    setStudents([...students, newStudent]);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery)
  );

  const styles = {
    body: {
      backgroundColor: "#f9f9f9",
      margin: 0,
      padding: 0,
      height: "100%",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    container: {
      width: "70vw",
      height: "100vh",
      margin: "80px 0px 0px 0px ",
      padding: "20px", 
      borderRadius: "10px",
      backgroundColor: "#f9f9f9",
      color: "black",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: "20px",
      borderBottom: "1px solid #ddd",
      marginBottom: "20px",
    },
    logo: {
      display: "flex",
      alignItems: "center",
    },
    logoImage: {
      height: "30px",
      marginRight: "10px",
    },
    logoText: {
      fontSize: "20px",
      fontWeight: "bold",
    },
    searchBar: {
      display: "flex",
      alignItems: "center",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    subtitle: {
      fontSize: "16px",
      color: "#888",
      marginBottom: "20px",
    },
    waitListContainer: {
      border: "1px solid #eee",
      borderRadius: "10px",
      padding: "10px",
    },
    waitListHeader: {
      fontSize: "14px",
      fontWeight: "bold",
      color: "#555",
      marginBottom: "10px",
      paddingBottom: "5px",
      borderBottom: "1px solid #ddd",
    },
    waitList: {
      listStyleType: "none",
      padding: "0",
      margin: "0",
    },
    studentItem: {
      display: "flex",
      alignItems: "center",
      padding: "10px 0",
      borderBottom: "1px solid #eee",
    },
    lastItem: {
      borderBottom: "none",
    },
    userIcon: {
      height: "30px",
      marginRight: "10px",
    },
    studentName: {
      fontSize: "16px",
      fontWeight: "bold",
    },
    studentEmail: {
      fontSize: "14px",
      color: "#888",
    },
    studentIndex: {
      fontSize: "18px",
      fontWeight: "bold",
      marginRight: "10px",
      color: "#333",
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.logo}>
            <img
              src="ifce.png"
              alt="IFCE Logo"
              style={styles.logoImage}
            />
            <span style={styles.logoText}>STUDfit</span>
          </div>

          <div style={styles.searchBar}>
            <Input
              placeholder="Buscar por nome..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Button color="success" variant="solid" size="md">
              <IoSearch />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <h2 style={styles.title}>Lista de espera</h2>
        <p style={styles.subtitle}>
          Lista de estudantes cadastrados na lista de espera da academia do IFCE Campus Cedro
        </p>

        <AddAluno onAddStudent={handleAddStudent} />

        <div style={styles.waitListContainer}>
          <div style={styles.waitListHeader}>NOME</div>
          <ul style={styles.waitList}>
            {filteredStudents.map((student, index) => (
              <li
                key={index}
                style={{
                  ...styles.studentItem,
                  ...(index === filteredStudents.length - 1 ? styles.lastItem : {}),
                }}
              >
                <span style={styles.studentIndex}>{index + 1}.</span>
                <img
                  src="https://www.svgrepo.com/download/497407/profile-circle.svg"
                  alt="User"
                  style={styles.userIcon}
                />
                <div>
                  <div style={styles.studentName}>{student.name}</div>
                  <p style={styles.studentEmail}>{student.email}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ListaPublica;
