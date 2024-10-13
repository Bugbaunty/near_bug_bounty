import { useEffect, useState } from 'react';
import { Wallet, NearContext } from './near';
import { NetworkId } from './config';


const wallet = new Wallet({ networkId: NetworkId });


function NearProvider ({children}) {

    const [signedAccountId, setSignedAccountId] = useState('');

    useEffect(() => { wallet.startUp(setSignedAccountId) }, []);
    return (
<NearContext.Provider value={{ wallet, signedAccountId }}>
    {children}
</NearContext.Provider>
    )
}

export default NearProvider