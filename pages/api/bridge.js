export default async function handler(req, res) {
  // 環境変数からRailwayのURLを取得
  // (末尾の / を取り除く処理を含む)
  const backendUrl = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');

  if (!backendUrl) {
    return res.status(500).json({ error: 'NEXT_PUBLIC_API_URL is not set' });
  }

  try {
    // VercelのサーバーからRailwayへアクセス (サーバー間通信なのでCORSエラーにならない)
    const response = await fetch(`${backendUrl}/`);

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
