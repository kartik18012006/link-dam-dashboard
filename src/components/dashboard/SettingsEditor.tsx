import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useStore } from '@/store/useStore'

export function SettingsEditor() {
  const { user, updateUser } = useStore()
  const { toast } = useToast()
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState('')

  const handleUsernameChange = () => {
    if (username.length < 3) {
      toast({
        title: 'Invalid username',
        description: 'Username must be at least 3 characters',
        variant: 'destructive',
      })
      return
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      toast({
        title: 'Invalid username',
        description:
          'Username can only contain letters, numbers, hyphens, and underscores',
        variant: 'destructive',
      })
      return
    }

    updateUser({ username })
    toast({
      title: 'Success',
      description: 'Username updated',
    })
  }

  const handleEmailChange = () => {
    if (!email.includes('@')) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      })
      return
    }

    updateUser({ email })
    toast({
      title: 'Success',
      description: 'Email updated',
    })
  }

  const handleDeleteAccount = () => {
    if (deleteConfirm !== 'DELETE') {
      toast({
        title: 'Error',
        description: 'Please type DELETE to confirm',
        variant: 'destructive',
      })
      return
    }

    toast({
      title: 'Demo Mode',
      description: 'Account deletion is disabled in demo mode',
    })
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Manage your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="flex gap-2">
              <Input
                id="username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))
                }
                placeholder="username"
                minLength={3}
                maxLength={30}
                pattern="[a-zA-Z0-9_-]+"
              />
              <Button
                onClick={handleUsernameChange}
                disabled={username === user.username}
              >
                Update
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Your profile URL: linkdam.io/{username || 'username'}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="flex gap-2">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
              <Button
                onClick={handleEmailChange}
                disabled={email === user.email}
              >
                Update
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible and destructive actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Account</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account, links, and all associated data.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="delete-confirm">
                    Type <strong>DELETE</strong> to confirm
                  </Label>
                  <Input
                    id="delete-confirm"
                    value={deleteConfirm}
                    onChange={(e) => setDeleteConfirm(e.target.value)}
                    placeholder="DELETE"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirm !== 'DELETE'}
                >
                  Delete Account
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  )
}
