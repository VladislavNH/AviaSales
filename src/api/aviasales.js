const API_BASE = 'api/aviasales';

export async function getSearchId() {
  const res = await fetch(`${API_BASE}/search`);
  if (!res.ok) throw new Error('Не удалось получить searchId');
  const { searchId } = await res.json();
  return searchId;
}

export async function getTickets(searchId) {
  const res = await fetch(`${API_BASE}/tickets?searchId=${searchId}`);
  if (!res.ok) {
    if (res.status === 500) return getTickets(searchId);
    throw new Error('Ошибка при получении билетов');
  }
  return res.json(); 
}
