"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Trash2, Mail, Phone, Calendar, MapPin, User, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { getAllUsers, deleteUser, type UserRecord } from "@/lib/users"
import { toast } from "sonner"

export default function UsersPage() {
    const [users, setUsers] = useState<UserRecord[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        setIsLoading(true)
        try {
            const data = await getAllUsers()
            setUsers(data as UserRecord[])
        } catch (error) {
            console.error("Error fetching users:", error)
            toast.error("Failed to load users")
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation() // Prevent opening the dialog when clicking delete
        if (!confirm("Are you sure you want to delete this user?")) return
        try {
            await deleteUser(id)
            setUsers(users.filter((u) => u.id !== id))
            toast.success("User deleted successfully")
        } catch (error) {
            console.error("Error deleting user:", error)
            toast.error("Failed to delete user")
        }
    }

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter">USERS</h1>
                    <p className="text-gray-500 tracking-widest mt-2">MANAGE REGISTERED CUSTOMERS</p>
                </div>
                <Button
                    onClick={fetchUsers}
                    variant="outline"
                    className="border-2 border-black hover:bg-black hover:text-white transition-all font-bold"
                >
                    REFRESH
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <Card key={i} className="p-6 border-2 border-gray-100 animate-pulse">
                            <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
                            <div className="h-4 w-48 bg-gray-100 rounded mb-2" />
                            <div className="h-4 w-40 bg-gray-100 rounded" />
                        </Card>
                    ))
                ) : users.length === 0 ? (
                    <div className="col-span-full py-12 px-6 text-center border-2 border-dashed border-gray-200 rounded-xl space-y-6">
                        <h2 className="text-2xl font-bold text-gray-400">NO USERS FOUND YET</h2>
                        <div className="max-w-2xl mx-auto text-left bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <p className="text-sm font-bold text-gray-700 mb-4">REQUIRED SUPABASE SCHEMA:</p>
                            <p className="text-xs text-gray-500 mb-4">Make sure your "users" table has these columns to store all checkout details:</p>
                            <pre className="bg-black text-green-400 p-4 rounded text-[10px] overflow-x-auto">
                                {`-- Run this in your Supabase SQL Editor:
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_name TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS state TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS zip_code TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS country TEXT;

-- Ensure email is unique for upsert to work
ALTER TABLE users ADD CONSTRAINT users_email_key UNIQUE (email);`}
                            </pre>
                        </div>
                        <p className="text-gray-400 text-sm">Once a user completes the checkout form, they will appear here.</p>
                    </div>
                ) : (
                    users.map((user) => (
                        <motion.div
                            key={user.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={() => setSelectedUser(user)}
                            className="cursor-pointer"
                        >
                            <Card className="p-6 border-2 border-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 relative group">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold uppercase truncate pr-8">
                                        {user.first_name} {user.last_name}
                                    </h3>
                                    <button
                                        onClick={(e) => user.id && handleDelete(e, user.id)}
                                        className="text-red-500 hover:text-red-700 transition-colors p-2"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <Mail className="w-4 h-4" />
                                        <span className="truncate">{user.email}</span>
                                    </div>
                                    {user.phone && (
                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <Phone className="w-4 h-4" />
                                            <span>{user.phone}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center space-x-2 text-gray-400 mt-4 pt-4 border-t">
                                        <Calendar className="w-4 h-4" />
                                        <span>Joined {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</span>
                                    </div>
                                </div>

                                {user.address && (
                                    <div className="mt-4 p-3 bg-gray-50 text-xs rounded border border-gray-200">
                                        <p className="font-bold mb-1">SHIPPING ADDRESS:</p>
                                        <p className="truncate">{user.address}</p>
                                        <p className="truncate">{user.city}, {user.state} {user.zip_code}</p>
                                    </div>
                                )}
                            </Card>
                        </motion.div>
                    ))
                )}
            </div>

            {/* User Details Dialog */}
            <Dialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
                <DialogContent className="max-w-2xl border-4 border-black p-0 overflow-hidden bg-white">
                    <DialogHeader className="bg-black text-white p-8">
                        <DialogTitle className="text-3xl font-black tracking-tighter uppercase mb-2">
                            CUSTOMER DETAILS
                        </DialogTitle>
                        <DialogDescription className="text-gray-400 tracking-widest uppercase">
                            FULL PROFILE FOR {selectedUser?.first_name} {selectedUser?.last_name}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <section className="space-y-6">
                            <div>
                                <h4 className="flex items-center gap-2 font-black tracking-widest text-sm mb-4 border-b-2 border-black pb-2">
                                    <User className="w-4 h-4" /> PERSONAL INFO
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-gray-500 uppercase">First Name</span>
                                        <span className="text-lg font-bold">{selectedUser?.first_name || 'N/A'}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-gray-500 uppercase">Last Name</span>
                                        <span className="text-lg font-bold">{selectedUser?.last_name || 'N/A'}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-gray-500 uppercase">Email Address</span>
                                        <span className="text-lg font-bold underline">{selectedUser?.email || 'N/A'}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-gray-500 uppercase">Phone Number</span>
                                        <span className="text-lg font-bold">{selectedUser?.phone || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="flex items-center gap-2 font-black tracking-widest text-sm mb-4 border-b-2 border-black pb-2">
                                    <Hash className="w-4 h-4" /> METADATA
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-gray-500 uppercase">User ID</span>
                                        <span className="text-xs font-mono bg-gray-100 p-2 rounded">{selectedUser?.id || 'N/A'}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-gray-500 uppercase">Joined Date</span>
                                        <span className="text-sm font-bold">
                                            {selectedUser?.created_at ? new Date(selectedUser.created_at).toLocaleString() : 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <div className="h-full">
                                <h4 className="flex items-center gap-2 font-black tracking-widest text-sm mb-4 border-b-2 border-black pb-2">
                                    <MapPin className="w-4 h-4" /> SHIPPING DETAILS
                                </h4>
                                {selectedUser?.address ? (
                                    <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-200 space-y-4">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-gray-500 uppercase">Street Address</span>
                                            <span className="text-md font-bold text-gray-700">{selectedUser.address}</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-gray-500 uppercase">City</span>
                                                <span className="text-md font-bold text-gray-700">{selectedUser.city}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-gray-500 uppercase">State</span>
                                                <span className="text-md font-bold text-gray-700">{selectedUser.state}</span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-gray-500 uppercase">Zip Code</span>
                                                <span className="text-md font-bold text-gray-700">{selectedUser.zip_code}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-gray-500 uppercase">Country</span>
                                                <span className="text-md font-bold text-gray-700">{selectedUser.country}</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-48 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                                        <p className="text-gray-400 font-bold tracking-tighter">NO SHIPPING INFO PROVIDED</p>
                                        <p className="text-[10px] text-gray-400 mt-2 italic px-8 text-center uppercase">Customer has only completed the first step of checkout.</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    <div className="p-8 bg-gray-50 border-t-2 border-black flex justify-end">
                        <Button
                            onClick={() => setSelectedUser(null)}
                            className="bg-black text-white hover:bg-gray-800 px-12 font-bold uppercase tracking-widest"
                        >
                            CLOSE PROFILE
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
