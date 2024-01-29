import { useState } from "react";
import "./App.css";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts.js";

function Character() {
  const [attrValues, setAttrValues] = useState({
    Strength: 10,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 10,
  });
  const [skillValues, setSkillValues] = useState({});
  const [showClassDetails, setShowClassDetails] = useState({});
  const caclulateModifier = (value) => {
    return Math.floor((value - 10) / 2);
  };
  const totalAvilableSkills = () =>
    10 + caclulateModifier(attrValues["Intelligence"]) * 4;
  return (
    <>
      <ul>
        {ATTRIBUTE_LIST.map((item) => (
          <li key={item}>
            {item}
            <button
              onClick={() => {
                var sum = 0;
                Object.values(attrValues).forEach((e) => (sum += e));
                if (sum < 70) {
                  setAttrValues({
                    ...attrValues,
                    [item]: attrValues[item] ? attrValues[item] + 1 : 1,
                  });
                }
              }}
            >
              +
            </button>
            <button
              onClick={() => {
                setAttrValues({
                  ...attrValues,
                  [item]: attrValues[item] ? attrValues[item] - 1 : 0,
                });
              }}
            >
              -
            </button>
            <p>
              {attrValues[item]} Modifier: {caclulateModifier(attrValues[item])}
            </p>
          </li>
        ))}
      </ul>
      <ul>
        {Object.keys(CLASS_LIST).map((item) => (
          <li
            key={item}
            style={{
              color:
                Object.keys(CLASS_LIST[item]).filter(
                  (e) => CLASS_LIST[item][e] <= attrValues[e]
                ).length === 6
                  ? "red"
                  : "white",
            }}
            onClick={() =>
              setShowClassDetails({
                ...showClassDetails,
                [item]: !showClassDetails[item],
              })
            }
          >
            {item}
            {showClassDetails[item] ? (
              Object.keys(CLASS_LIST[item]).map((e) => (
                <p key={e}>
                  {e}: {CLASS_LIST[item][e]}
                </p>
              ))
            ) : (
              <></>
            )}
          </li>
        ))}
      </ul>
      <ul>
        <p>Total Skill Points: {totalAvilableSkills()}</p>
        {SKILL_LIST.map((item) => (
          <li key={item.name}>
            {item.name}: {skillValues[item.name] ?? 0} (Modifier:{" "}
            {item.attributeModifier}):{" "}
            {caclulateModifier(attrValues[item.attributeModifier])}
            <button
              onClick={() => {
                var sum = 0;
                Object.values(skillValues).forEach((e) => (sum += e));
                if (sum < totalAvilableSkills()) {
                  setSkillValues({
                    ...skillValues,
                    [item.name]: skillValues[item.name]
                      ? skillValues[item.name] + 1
                      : 1,
                  });
                }
              }}
            >
              +
            </button>
            <button
              onClick={() => {
                setAttrValues({
                  ...attrValues,
                  [item]: attrValues[item] ? attrValues[item] - 1 : 0,
                });
              }}
            >
              -
            </button>
            :{" "}
            {skillValues[item.name]
              ? skillValues[item.name] +
                caclulateModifier(attrValues[item.attributeModifier])
              : 0 + caclulateModifier(attrValues[item.attributeModifier])}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Character;
