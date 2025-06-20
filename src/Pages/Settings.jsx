import React from 'react';
import ProAcc from '../Components/settings/ProAcc';
import Theme from '../Components/settings/Theme';
import Privacy from '../Components/settings/Privacy';

const Settings = () => (
  <div className="mx-4 my-8 max-w-3xl">
    <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Settings</h1>

    <ProAcc />

    <Theme />

    <Privacy />
  </div>
);

export default Settings;