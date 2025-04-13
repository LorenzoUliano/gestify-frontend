async function registerUser() {
    const res = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "teste@teste.com",
        password: "123456",
        name: "Teste User",
        role: "USER"
      }),
    });
  
    const data = await res.text();
  }