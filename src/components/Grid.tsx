import React, { useState, useCallback } from "react";
import styled from "styled-components";
import constants from "src/constants";
import Card from "src/components/Card";

const Container = styled.div`
  padding: 30px 0;
  margin: 0 -15px;
  display: flex;
  flex-wrap: wrap;
`;

const Grid = () => {
  const [dishes, setDishes] = useState<string[]>([
    "i could not think of a long enough dish name to test how long dish names display",
    "Petri dish",
    "Satellite dish",
    "Dish antenna",
    "The Dish",
  ]);

  const addItem = useCallback(
    (name: string) => setDishes((dishes) => [name, ...dishes]),
    []
  );

  const deleteItem = useCallback(
    (name: string) => {
      dishes.splice(dishes.indexOf(name), 1);
      setDishes([...dishes]);
    },
    [dishes]
  );

  const editItem = useCallback(
    (oldName: string, name: string) => {
      dishes[dishes.indexOf(oldName)] = name;
      setDishes([...dishes]);
    },
    [dishes]
  );

  return (
    <Container>
      <Card unset onAdd={addItem} />
      {dishes.map((dish) => (
        <Card key={dish} name={dish} onDelete={deleteItem} onEdit={editItem} />
      ))}
    </Container>
  );
};

export default Grid;
