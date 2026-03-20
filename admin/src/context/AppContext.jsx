import { createContext } from "react"

export const AppContext = createContext();

const AppContextProvider = (props) => {
const currency = "$";
const frontend_url = import.meta.env.VITE_FRONTEND_URL;

// const calculateAge = (dob) => {
//   const today = new Date();
//   const birthday = new Date(dob);

//   let age = today.getFullYear() - birthday.getFullYear();
//   return age
// }

const calculateAge = (dob) => {
  if (!dob) return "";

  const today = new Date();
  const birthDate = new Date(dob);

  // ❌ Future date check
  if (birthDate > today) return 0;

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();

  // Adjust if birthday hasn't come yet this year
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};
     const value = {
       calculateAge,
       frontend_url,
       currency
     }

      return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
      )
}

export default AppContextProvider;
