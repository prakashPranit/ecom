"use client"

interface AlertModalProps {
    isOpen: boolean;
    onClose: any;
    onConfirm: (event: any) => void;
    loading: boolean;

}

import React, { useEffect, useState } from 'react'
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';

const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading
}) => {

    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }


    return (
        <div>
            <Modal
            title='Are you sure you want to'
            description='This action cant be undone'
            isOpen={isOpen}
            onClose={onClose}>
                <div className='pt-6 space-x-2 items-center w-full'>
                    <Button disabled={loading} variant="outline" onClick={onClose} >Cancel</Button>
                    <Button disabled={loading} variant="destructive" onClick={onConfirm} > Confirm</Button>

                </div>
    </Modal>            

</div>
    )
}

export default AlertModal