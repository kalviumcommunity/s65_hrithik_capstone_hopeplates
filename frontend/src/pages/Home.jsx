const Home = () => {
    return (
        <>
            <div className="hero">
                <h1>Welcome to HopePlates</h1>
                <p>Connecting donors with NGOs and volunteers to make a difference.</p>
            </div>
            <div className="container">
                <div className="text-center mb-2">
                    <h2>Our Mission</h2>
                    <p>At HopePlates, we believe that everyone deserves access to nutritious food. Our platform connects food donors with NGOs and volunteers to ensure surplus food reaches those in need.</p>
                </div>
                <div className="card-grid">
                    <div className="card">
                        <h3>Make a Donation</h3>
                        <p>Share your surplus food with those in need.</p>
                    </div>
                    <div className="card">
                        <h3>Find Resources</h3>
                        <p>NGOs can find available food donations.</p>
                    </div>
                    <div className="card">
                        <h3>Manage Events</h3>
                        <p>Coordinate food distribution events efficiently.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home