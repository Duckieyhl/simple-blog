import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Chỉ cần Link vì PostLists thường nằm bên trong Routes rồi

export default function PostLists() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Sửa lại dấu ngoặc kép ở cuối URL
                const response = await fetch("https://qshsfj-8080.csb.app/api/posts");

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Không thể tải danh sách bài viết. Vui lòng thử lại sau!");
            } finally {
                setLoading(false); // Dù thành công hay lỗi cũng tắt loading
            }
        };

        fetchData();
    }, []);

    // Hiển thị trạng thái đang tải
    if (loading) return <p style={{ padding: 20 }}>Đang tải danh sách...</p>;

    // Hiển thị thông báo lỗi nếu có
    if (error) return <p style={{ padding: 20, color: 'red' }}>{error}</p>;

    return (
        <div style={{ padding: 20 }}>
            <h2>Danh sách bài viết</h2>
            <ul>
                {data.length > 0 ? (
                    data.map((d) => (
                        <li key={d.slug}>
                            <Link to={`/posts/${d.slug}`}>
                                <h3>{d.title}</h3>
                            </Link>
                        </li>
                    ))
                ) : (
                    <p>Hiện chưa có bài viết nào.</p>
                )}
            </ul>
        </div>
    );
}