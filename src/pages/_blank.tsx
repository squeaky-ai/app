import React from 'react';
import type { NextPage } from 'next';

// The player needs to load a page in order for the
// onload event to fire. It also needs to be on the
// same domain, so this seems like the simplest option
const Blank: NextPage = () => (<></>);

export default Blank;
