import AdminHeaderComponents from "../layouts/AdminHeaderComponents";
import AdminAsideComponents from "../layouts/AdminAsideComponents";

function DashboardComponents() {
    return (
        <div>
            <AdminHeaderComponents/>
            <AdminAsideComponents/>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Dashboard</h1>
                </div>
            </main>
        </div>
    )
}

export default DashboardComponents;