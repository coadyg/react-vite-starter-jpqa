import { useEffect, useState } from "react"

function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {

    function initAuth() {

      if (!window.catalyst) {
        setTimeout(initAuth, 100)
        return
      }

      window.catalyst.auth.getCurrentUser()
        .then(user => {
          setUser(user)
        })
        .catch(() => {
          window.catalyst.auth.signIn("login-container")
        })

    }

    initAuth()

  }, [])

  if (!user) {

    return (
      <div className="login-wrapper">

        <div className="login-card">

          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Please login
          </h2>

          <div id="login-container"></div>

        </div>

      </div>
    )

  }

  return (

    <div style={{ textAlign: "center", paddingTop: "100px" }}>

      <h2>Logged in successfully</h2>

      <p>
        Welcome <strong>{user.first_name} {user.last_name}</strong>
      </p>

    </div>

  )

}

export default App
