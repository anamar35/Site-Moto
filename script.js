body {
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  background: #f4f4f4;
}

header {
  background: #222;
  color: #fff;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header button {
  padding: 8px 16px;
  background: #ff4747;
  border: none;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
}

#userStatus {
  margin-left: 10px;
  font-weight: bold;
  color: #9df59d;
}

#top-bar {
  margin: 20px;
  display: flex;
  gap: 20px;
}

#controls {
  margin: 20px;
  display: flex;
  gap: 15px;
}

#catalog {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  padding: 20px;
  gap: 20px;
}

.card {
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.15);
  text-align: center;
  cursor: pointer;
}

.card img {
  width: 100%;
  border-radius: 6px;
}

/* Modais */
.modal {
  display: none;
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.6);
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 25px;
  width: 90%;
  max-width: 400px;
  border-radius: 10px;
}

.close {
  float: right;
  cursor: pointer;
  font-size: 24px;
}

/* Login fields */
.modal-content input {
  width: 100%;
  padding: 10px;
  margin-top: 6px;
  margin-bottom: 15px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.modal-content button {
  width: 100%;
  padding: 10px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
