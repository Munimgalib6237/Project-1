// import jwt_decode from "jwt-decode"

// export const checkIfLoggedIn = async () => {
//     const token = localStorage.getItem("token")
//     if (token) {
//         try {
//             const user = jwt_decode(token)
//             return user
//         } catch (error) {
//             if (error) {
//                 localStorage.clear()
//                 return false
//             }
//         }
//     }
// }


// import jwt_decode from "jwt-decode"

export const isAuthenticate = () => {
  const token = localStorage.getItem("token")
  if (token) {
    return true
    // const user = jwt_decode(token)
    // if (user) {
    //   return user
    // } else {
    //   return false
    // }
  }
}