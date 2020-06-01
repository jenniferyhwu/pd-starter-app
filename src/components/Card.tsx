import React, { useState, useCallback, useRef } from "react";
import styled from "styled-components";
import constants from "src/constants";
import { Trash, Plus, Check, X, Edit2 } from "react-feather";

interface UnsetCardProps {
  onAdd: (name: string) => void;
}

interface SetCardProps {
  name: string;
  onEdit: (oldName: string, name: string) => void;
  onDelete: (name: string) => void;
}

type CardProps = (UnsetCardProps | SetCardProps) & {
  unset?: boolean;
};

interface InputFormProps {
  inputRef: React.RefObject<HTMLInputElement>;
  onInputKeyDown: (key: React.KeyboardEvent<HTMLInputElement>) => void;
  onInputChangeConfirm: () => void;
  onInputChangeCancel: () => void;
}

const ActionButton = styled.button`
  color: ${constants.color.green};
  border: none;
  outline: none;
  background: none;
  transition: opacity 0.5s, color 0.2s;

  :hover,
  :focus {
    color: ${constants.color.mediumpalegreen};
  }
`;

const PrimaryActionButton = styled(ActionButton)`
  color: ${constants.color.green};

  :hover,
  :focus {
    color: ${constants.color.mediumpalegreen};
  }
`;

const ButtonContainer = styled.div``;

const CardInput = styled.input`
  outline: none;
  border: none;
  border-bottom: 2px solid ${constants.color.green};
  margin-bottom: 15px;
  background: none;
  font-size: 16px;
  letter-spacing: 3px;
  padding: 10px 0;
  color: ${constants.color.green};
`;

const NameText = styled.p`
  margin-top: 0;
  line-height: 30px;
  letter-spacing: 3px;
  font-size: 16px;
  color: ${constants.color.green};
  transition-duration: 0.5s;
  text-align: center;
`;

const NameContainer = styled.div`
  padding: 25px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  z-index: 1;
  word-break: break-word;

  ::before {
    content: "";
    transition-duration: 0.5s;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
  }
`;

const Container = styled.div`
  height: 230px;
  width: 230px;
  border-radius: 20px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
`;

const UnsetContainer = styled(Container)`
  border: 3px solid ${constants.color.green};
  outline: none;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${constants.color.green};
  transition-duration: 0.2s;

  :hover,
  &.adding {
    opacity: 0.6;
  }
`;

const SetContainer = styled(Container)`
  background: ${constants.color.palegreen};

  /* :hover {
    .name--container::before {
      background: black;
      opacity: 0.5;
    }

    .name--text {
      color: ${constants.color.white};
    }

    .name--action {
      opacity: 1;
    }
  } */
`;

const InputForm: React.FC<InputFormProps> = ({
  inputRef,
  onInputKeyDown = () => {},
  onInputChangeConfirm = () => {},
  onInputChangeCancel = () => {},
}) => (
  <>
    <CardInput
      placeholder="Dish name"
      maxLength={80}
      onKeyDown={(e) => onInputKeyDown(e)}
      ref={inputRef}
    ></CardInput>
    <ButtonContainer>
      <ActionButton onClick={onInputChangeConfirm} aria-label="confirm">
        <Check />
      </ActionButton>
      <ActionButton onClick={onInputChangeCancel} aria-label="cancel">
        <X />
      </ActionButton>
    </ButtonContainer>
  </>
);

const UnsetCard: React.FC<UnsetCardProps> = ({ onAdd }) => {
  const [adding, setAdding] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = useCallback(() => {
    if (!adding) setAdding(true);
  }, [adding]);

  const onInternalAdd = useCallback(() => {
    setAdding(false);
    if (inputRef.current) onAdd(inputRef.current.value);
  }, [onAdd]);

  const onKeyDownAdd = useCallback(
    (e) => {
      if (e.key === "Enter") onInternalAdd();
    },
    [onInternalAdd]
  );

  return (
    <UnsetContainer
      as={adding ? "div" : "button"}
      className={adding ? "adding" : ""}
      aria-label={adding ? "" : "add dish"}
      onClick={onChange}
    >
      {adding ? (
        <NameContainer className="unset--container">
          <InputForm
            inputRef={inputRef}
            onInputKeyDown={onKeyDownAdd}
            onInputChangeConfirm={onInternalAdd}
            onInputChangeCancel={() => setAdding(false)}
          />
        </NameContainer>
      ) : (
        <Plus size={70} strokeWidth={1} />
      )}
    </UnsetContainer>
  );
};

const SetCard: React.FC<SetCardProps> = ({ name, onEdit, onDelete }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onInternalEdit = useCallback(() => {
    setEditing(false);
    if (inputRef.current) onEdit(name, inputRef.current.value);
  }, [name, onEdit]);

  const onKeyDownEdit = useCallback(
    (e) => {
      if (e.key === "Enter") onInternalEdit();
    },
    [onInternalEdit]
  );

  return (
    <SetContainer>
      <NameContainer className="name name--container">
        {editing ? (
          <InputForm
            inputRef={inputRef}
            onInputKeyDown={onKeyDownEdit}
            onInputChangeConfirm={onInternalEdit}
            onInputChangeCancel={() => setEditing(false)}
          />
        ) : (
          <>
            <NameText className="name name--text">{name}</NameText>
            <ButtonContainer>
              <PrimaryActionButton
                className="name name--action"
                onClick={() => setEditing(true)}
                aria-label="edit dish"
              >
                <Edit2 />
              </PrimaryActionButton>
              <PrimaryActionButton
                className="name name--action"
                onClick={() => onDelete(name)}
                aria-label="delete dish"
              >
                <Trash />
              </PrimaryActionButton>
            </ButtonContainer>
          </>
        )}
      </NameContainer>
    </SetContainer>
  );
};

const Card: React.FC<CardProps> = ({ unset = false, ...rest }) => {
  if (unset) {
    if ("onAdd" in rest) {
      return <UnsetCard onAdd={rest.onAdd} />;
    } else {
      throw new TypeError("Your props are incompatible with an unset Dish");
    }
  } else {
    if ("name" in rest) {
      return (
        <SetCard
          name={rest.name}
          onEdit={rest.onEdit}
          onDelete={rest.onDelete}
        />
      );
    } else {
      throw new TypeError("Your props are incompatible with an set Dish");
    }
  }
};

export default Card;
