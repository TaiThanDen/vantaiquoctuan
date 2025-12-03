export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Tổng số xe</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">24</p>
            </div>
            <div className="text-4xl">🚛</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Đơn hàng</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">156</p>
            </div>
            <div className="text-4xl">📦</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Tin tức</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">48</p>
            </div>
            <div className="text-4xl">📰</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Người dùng</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">89</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Hoạt động gần đây
          </h2>
        </div>
        <div className="p-6">
          <p className="text-gray-500">Chưa có hoạt động nào</p>
        </div>
      </div>
    </div>
  );
}
