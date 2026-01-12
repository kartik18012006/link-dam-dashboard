import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus, GripVertical, Trash2, Pencil, ExternalLink } from 'lucide-react'
import { sanitizeUrl } from '@/lib/utils'
import { useStore } from '@/store/useStore'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export function LinksManager() {
  const { links, addLink, updateLink, deleteLink, reorderLinks } = useStore()
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingLink, setEditingLink] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = links.findIndex((link) => link.id === active.id)
      const newIndex = links.findIndex((link) => link.id === over.id)
      const newLinks = arrayMove(links, oldIndex, newIndex)
      reorderLinks(newLinks)
      toast({
        title: 'Success',
        description: 'Links reordered',
      })
    }
  }

  const handleAddLink = () => {
    setEditingLink(null)
    setTitle('')
    setUrl('')
    setIsDialogOpen(true)
  }

  const handleEditLink = (linkId: string) => {
    const link = links.find((l) => l.id === linkId)
    if (link) {
      setEditingLink(linkId)
      setTitle(link.title)
      setUrl(link.url)
      setIsDialogOpen(true)
    }
  }

  const handleSaveLink = () => {
    if (!title.trim() || !url.trim()) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      })
      return
    }

    const sanitizedUrl = sanitizeUrl(url)
    if (!sanitizedUrl) {
      toast({
        title: 'Error',
        description: 'Please enter a valid URL',
        variant: 'destructive',
      })
      return
    }

    if (editingLink) {
      updateLink(editingLink, {
        title: title.trim(),
        url: sanitizedUrl,
      })
      toast({
        title: 'Success',
        description: 'Link updated',
      })
    } else {
      addLink({
        title: title.trim(),
        url: sanitizedUrl,
        enabled: true,
      })
      toast({
        title: 'Success',
        description: 'Link added',
      })
    }

    setIsDialogOpen(false)
    setTitle('')
    setUrl('')
    setEditingLink(null)
  }

  const handleDeleteLink = (linkId: string) => {
    if (!confirm('Are you sure you want to delete this link?')) return
    deleteLink(linkId)
    toast({
      title: 'Success',
      description: 'Link deleted',
    })
  }

  const handleToggleEnabled = (linkId: string, enabled: boolean) => {
    updateLink(linkId, { enabled })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Your Links</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddLink}>
                <Plus className="mr-2 h-4 w-4" />
                Add Link
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingLink ? 'Edit Link' : 'Add New Link'}
                </DialogTitle>
                <DialogDescription>
                  Add a new link to your profile
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="My Website"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveLink}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {links.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            No links yet. Add your first link to get started!
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={links.map((l) => l.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {links.map((link) => (
                  <SortableLinkItem
                    key={link.id}
                    link={link}
                    onEdit={handleEditLink}
                    onDelete={handleDeleteLink}
                    onToggleEnabled={handleToggleEnabled}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </CardContent>
    </Card>
  )
}

interface SortableLinkItemProps {
  link: {
    id: string
    title: string
    url: string
    enabled: boolean
    clickCount: number
  }
  onEdit: (linkId: string) => void
  onDelete: (linkId: string) => void
  onToggleEnabled: (linkId: string, enabled: boolean) => void
}

function SortableLinkItem({
  link,
  onEdit,
  onDelete,
  onToggleEnabled,
}: SortableLinkItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 rounded-lg border bg-card p-4"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </button>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{link.title}</h3>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        <p className="text-sm text-muted-foreground truncate">{link.url}</p>
        <p className="text-xs text-muted-foreground">
          {link.clickCount} clicks
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Switch
          checked={link.enabled}
          onCheckedChange={(checked) => onToggleEnabled(link.id, checked)}
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(link.id)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(link.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
