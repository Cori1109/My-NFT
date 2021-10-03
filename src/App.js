// import logo from './logo.svg';
import './styles/App.css';
import { Tabs } from 'antd';
import { Home } from './pages/index';
import { CreateItem} from './pages/create-item';
import { MyNfts } from './pages/my-nfts';
import env from "react-dotenv";
import { nftaddress, nftmarketaddress, API_URL, PRIVATE_KEY } from "./config";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

function App() {
  return (
    <div className="main-layout">
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Home" key="1">
          <Home />
        </TabPane>
        <TabPane tab="Create NFT" key="2">
          <CreateItem />
        </TabPane>
        <TabPane tab="My NFTSs" key="3">
          <MyNfts />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
