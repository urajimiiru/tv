class MockServer {
    getResults(){
        return [1,2,3,4,5].map(v=>parseInt(Math.random()*100));
    }
}

export default MockServer;