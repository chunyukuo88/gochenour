export const mocks = {
  SINGLE_RULE_SET_ORIGINAL: '.something {\n  padding: 16px 8px 0 32px;\n  transform: translate(12px, 0px) rotate(-40deg);\n  border: 3px;\n  margin: 160px;\n  box-shadow: 0px 1px 16px rgba(0, 0, 0, 0.07);\n}',
  SINGLE_RULE_SET_UPDATED: '.something {\n  border: 3px;\n  box-shadow: 0px 1px 16px rgba(0, 0, 0, 0.07);\n  margin: 160px;\n  padding: 16px 8px 0 32px;\n  transform: translate(12px, 0px) rotate(-40deg);\n}',
  MULTIPLE_RULE_SETS_ORIGINAL: '.something {\n  padding: 16px 8px 0 32px;\n  transform: translate(12px, 0px) rotate(-40deg);\n  border: 3px;\n  margin: 160px;\n  box-shadow: 0px 1px 16px rgba(0, 0, 0, 0.07);\n}\n\n.a-ruleset {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    justify-content: center;\n}',
  MULTIPLE_RULE_SETS_UPDATED: '.something {\n  border: 3px;\n  box-shadow: 0px 1px 16px rgba(0, 0, 0, 0.07);\n  margin: 160px;\n  padding: 16px 8px 0 32px;\n  transform: translate(12px, 0px) rotate(-40deg);\n}\n.a-ruleset {\n  align-items: center;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n}',
};
