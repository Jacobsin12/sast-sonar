import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  // Nota: En el pipeline, k6 probará el contenedor antes de subirlo
  http.get('http://localhost:3000');
  sleep(1);
}