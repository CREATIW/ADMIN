import { Select } from 'antd'
import React from 'react'
import { LogoIcon } from '../assets/icons/index'

function Header() {
    return (
        <div className='header'>
            <div className="header__row">
                <div className="header__logo">
                    <LogoIcon />
                </div>
                <div className="header__select">
                    <Select
                        defaultValue="uz"
                        style={{ width: 120 }}
                        options={[
                            { value: 'uz', label: 'Uzbekcha' },
                            { value: 'ru', label: 'Ruscha' },
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}

export default Header