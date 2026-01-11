"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plus,
  Pencil,
  Trash2,
  Upload,
  Package,
  AlertTriangle,
  ClipboardList,
  Gamepad2,
} from "lucide-react";

/**
 * ✅ Admin Dashboard (New Layout)
 * - Add / Edit / Delete Games
 * - Upload License Keys (bulk)
 * - Order Management
 * - Low-Stock Alerts
 *
 * Save as: app/admin/page.tsx
 *
 * Note: Requires shadcn components: tabs, dialog, textarea.
 */

type Game = {
  id: number;
  title: string;
  platform: string;
  price: number;
  discount: number;
  stock: number; // available license keys
};

type Order = {
  id: string;
  customerEmail: string;
  items: { gameTitle: string; platform: string; qty: number }[];
  total: number;
  status: "Pending" | "Fulfilled" | "Refunded";
  createdAt: string;
};

const initialGames: Game[] = [
  { id: 1, title: "Cyberpunk 2077", platform: "PC", price: 49.99, discount: 20, stock: 12 },
  { id: 2, title: "Elden Ring", platform: "PlayStation 5", price: 59.99, discount: 0, stock: 4 },
  { id: 3, title: "The Witcher 3: Wild Hunt", platform: "PC", price: 39.99, discount: 50, stock: 2 },
];

const initialOrders: Order[] = [
  {
    id: "ORD-10021",
    customerEmail: "customer1@example.com",
    items: [{ gameTitle: "Elden Ring", platform: "PlayStation 5", qty: 1 }],
    total: 59.99,
    status: "Pending",
    createdAt: "2026-01-12 10:15",
  },
  {
    id: "ORD-10022",
    customerEmail: "customer2@example.com",
    items: [
      { gameTitle: "Cyberpunk 2077", platform: "PC", qty: 1 },
      { gameTitle: "The Witcher 3: Wild Hunt", platform: "PC", qty: 1 },
    ],
    total: 49.99 * 0.8 + 39.99 * 0.5,
    status: "Fulfilled",
    createdAt: "2026-01-12 11:40",
  },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState<"games" | "keys" | "orders" | "alerts">("games");

  const [games, setGames] = useState<Game[]>(initialGames);
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  // dialogs
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  // forms
  const [formTitle, setFormTitle] = useState("");
  const [formPlatform, setFormPlatform] = useState("");
  const [formPrice, setFormPrice] = useState<number>(0);
  const [formDiscount, setFormDiscount] = useState<number>(0);
  const [formStock, setFormStock] = useState<number>(0);

  // upload keys
  const [keysGameId, setKeysGameId] = useState<number>(initialGames[0]?.id ?? 1);
  const [bulkKeys, setBulkKeys] = useState("");

  const lowStockThreshold = 5;

  const lowStockGames = useMemo(
    () => games.filter((g) => g.stock <= lowStockThreshold),
    [games]
  );

  const resetForm = () => {
    setFormTitle("");
    setFormPlatform("");
    setFormPrice(0);
    setFormDiscount(0);
    setFormStock(0);
  };

  const openAdd = () => {
    resetForm();
    setAddOpen(true);
  };

  const submitAdd = () => {
    if (!formTitle.trim() || !formPlatform.trim()) {
      toast.error("Please fill title and platform");
      return;
    }
    if (formPrice <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }
    const newGame: Game = {
      id: Math.max(0, ...games.map((g) => g.id)) + 1,
      title: formTitle.trim(),
      platform: formPlatform.trim(),
      price: Number(formPrice),
      discount: Math.min(Math.max(Number(formDiscount), 0), 100),
      stock: Math.max(Number(formStock), 0),
    };
    setGames((prev) => [newGame, ...prev]);
    setKeysGameId(newGame.id);
    setAddOpen(false);
    toast.success("Game added");
  };

  const openEdit = (game: Game) => {
    setSelectedGame(game);
    setFormTitle(game.title);
    setFormPlatform(game.platform);
    setFormPrice(game.price);
    setFormDiscount(game.discount);
    setFormStock(game.stock);
    setEditOpen(true);
  };

  const submitEdit = () => {
    if (!selectedGame) return;
    if (!formTitle.trim() || !formPlatform.trim()) {
      toast.error("Please fill title and platform");
      return;
    }
    if (formPrice <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    setGames((prev) =>
      prev.map((g) =>
        g.id === selectedGame.id
          ? {
              ...g,
              title: formTitle.trim(),
              platform: formPlatform.trim(),
              price: Number(formPrice),
              discount: Math.min(Math.max(Number(formDiscount), 0), 100),
              stock: Math.max(Number(formStock), 0),
            }
          : g
      )
    );

    setEditOpen(false);
    toast.success("Game updated");
  };

  const openDelete = (game: Game) => {
    setSelectedGame(game);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedGame) return;
    setGames((prev) => prev.filter((g) => g.id !== selectedGame.id));
    setDeleteOpen(false);
    toast.success("Game deleted");
  };

  const uploadKeys = () => {
    const target = games.find((g) => g.id === keysGameId);
    if (!target) {
      toast.error("Select a game first");
      return;
    }

    const lines = bulkKeys
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    if (lines.length === 0) {
      toast.error("Paste at least 1 key");
      return;
    }

    // We only increase stock count (simulate storing keys)
    setGames((prev) =>
      prev.map((g) => (g.id === keysGameId ? { ...g, stock: g.stock + lines.length } : g))
    );

    setBulkKeys("");
    toast.success("Keys uploaded", { description: `${lines.length} keys added to stock.` });
  };

  const setOrderStatus = (id: string, status: Order["status"]) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    toast.success("Order updated", { description: `Order ${id} marked as ${status}.` });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Manage games, license keys, orders, and stock alerts in one place.
            </p>
          </div>

          <div className="flex gap-2">
            <Badge variant="outline" className="gap-2">
              <Package className="h-4 w-4" />
              Games: {games.length}
            </Badge>
            <Badge variant={lowStockGames.length ? "destructive" : "secondary"} className="gap-2">
              <AlertTriangle className="h-4 w-4" />
              Low Stock: {lowStockGames.length}
            </Badge>
          </div>
        </div>

        {/* New Layout: Tabs + Content */}
        <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
          <TabsList className="grid grid-cols-4 w-full max-w-3xl">
            <TabsTrigger value="games" className="gap-2">
              <Gamepad2 className="h-4 w-4" />
              Games
            </TabsTrigger>
            <TabsTrigger value="keys" className="gap-2">
              <Upload className="h-4 w-4" />
              License Keys
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <ClipboardList className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="alerts" className="gap-2">
              <AlertTriangle className="h-4 w-4" />
              Alerts
            </TabsTrigger>
          </TabsList>

          {/* GAMES */}
          <TabsContent value="games" className="mt-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left: Table */}
              <Card className="lg:col-span-2">
                <CardHeader className="flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle>Games</CardTitle>
                    <CardDescription>Add, edit, delete game listings.</CardDescription>
                  </div>
                  <Button onClick={openAdd} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Game
                  </Button>
                </CardHeader>

                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Platform</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Discount</TableHead>
                        <TableHead className="text-right">Stock</TableHead>
                        <TableHead className="text-right w-[160px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {games.map((g) => (
                        <TableRow key={g.id}>
                          <TableCell className="font-semibold">{g.title}</TableCell>
                          <TableCell className="text-muted-foreground">{g.platform}</TableCell>
                          <TableCell className="text-right">${g.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                            {g.discount ? <span className="text-green-600">{g.discount}%</span> : "—"}
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge variant={g.stock <= lowStockThreshold ? "destructive" : "secondary"}>
                              {g.stock}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="icon" onClick={() => openEdit(g)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon" onClick={() => openDelete(g)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Right: Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common admin tasks.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-between" onClick={() => setTab("keys")}>
                    Upload License Keys
                    <Upload className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between" onClick={() => setTab("orders")}>
                    Order Management
                    <ClipboardList className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between" onClick={() => setTab("alerts")}>
                    Low-Stock Alerts
                    <AlertTriangle className="h-4 w-4" />
                  </Button>

                  <Separator />

                  <div className="text-sm text-muted-foreground">
                    Low stock threshold: <span className="font-medium">{lowStockThreshold}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* LICENSE KEYS */}
          <TabsContent value="keys" className="mt-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Upload License Keys</CardTitle>
                  <CardDescription>Paste keys in bulk (one key per line). Stock will increase.</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Select Game</label>
                      <select
                        className="w-full h-10 rounded-md border bg-background px-3 text-sm"
                        value={keysGameId}
                        onChange={(e) => setKeysGameId(Number(e.target.value))}
                      >
                        {games.map((g) => (
                          <option key={g.id} value={g.id}>
                            {g.title} — {g.platform} (stock: {g.stock})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Upload Type</label>
                      <Input value="Bulk Paste (Text)" readOnly />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Keys</label>
                    <Textarea
                      value={bulkKeys}
                      onChange={(e) => setBulkKeys(e.target.value)}
                      placeholder="XXXX-XXXX-XXXX-XXXX
YYYY-YYYY-YYYY-YYYY
ZZZZ-ZZZZ-ZZZZ-ZZZZ"
                      className="min-h-[160px]"
                    />
                    <p className="text-xs text-muted-foreground">Each non-empty line counts as 1 key.</p>
                  </div>

                  <Button onClick={uploadKeys} className="w-full gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Keys
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tips</CardTitle>
                  <CardDescription>Best practices for key uploads.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>• Keep keys separated by new lines.</p>
                  <p>• Upload to the correct platform.</p>
                  <p>• Use Alerts tab to monitor stock.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ORDERS */}
          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>View and manage customer orders.</CardDescription>
              </CardHeader>

              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                      <TableHead className="text-right w-[220px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {orders.map((o) => (
                      <TableRow key={o.id}>
                        <TableCell className="font-semibold">{o.id}</TableCell>
                        <TableCell className="text-muted-foreground">{o.customerEmail}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {o.items.map((it, idx) => (
                            <div key={idx}>
                              {it.gameTitle} ({it.platform}) x{it.qty}
                            </div>
                          ))}
                        </TableCell>
                        <TableCell className="text-right">${o.total.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant={
                              o.status === "Fulfilled" ? "secondary" : o.status === "Refunded" ? "destructive" : "outline"
                            }
                          >
                            {o.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setOrderStatus(o.id, "Fulfilled")}
                              disabled={o.status === "Fulfilled"}
                            >
                              Fulfill
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setOrderStatus(o.id, "Refunded")}
                              disabled={o.status === "Refunded"}
                            >
                              Refund
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ALERTS */}
          <TabsContent value="alerts" className="mt-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Low-Stock Alerts</CardTitle>
                  <CardDescription>Games with stock at or below {lowStockThreshold} keys.</CardDescription>
                </CardHeader>

                <CardContent>
                  {lowStockGames.length === 0 ? (
                    <div className="text-sm text-muted-foreground">No low-stock alerts right now ✅</div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Game</TableHead>
                          <TableHead>Platform</TableHead>
                          <TableHead className="text-right">Stock</TableHead>
                          <TableHead className="text-right w-[180px]">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {lowStockGames.map((g) => (
                          <TableRow key={g.id}>
                            <TableCell className="font-semibold">{g.title}</TableCell>
                            <TableCell className="text-muted-foreground">{g.platform}</TableCell>
                            <TableCell className="text-right">
                              <Badge variant="destructive">{g.stock}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm" onClick={() => setTab("keys")}>
                                Upload Keys
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>How it works</CardTitle>
                  <CardDescription>Alert rules and usage.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>• Threshold: ≤ {lowStockThreshold} keys.</p>
                  <p>• Upload keys from “License Keys” tab.</p>
                  <p>• Keep popular titles stocked to avoid delays.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />

      {/* ADD GAME DIALOG */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Game</DialogTitle>
            <DialogDescription>Create a new game listing for the store.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="Game title" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Platform</label>
                <Input value={formPlatform} onChange={(e) => setFormPlatform(e.target.value)} placeholder="PC / PS5 / Xbox" />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Price</label>
                <Input
                  type="number"
                  value={formPrice}
                  onChange={(e) => setFormPrice(Number(e.target.value))}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Discount %</label>
                <Input
                  type="number"
                  value={formDiscount}
                  onChange={(e) => setFormDiscount(Number(e.target.value))}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Stock</label>
                <Input
                  type="number"
                  value={formStock}
                  onChange={(e) => setFormStock(Number(e.target.value))}
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button onClick={submitAdd}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* EDIT GAME DIALOG */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Game</DialogTitle>
            <DialogDescription>Update game details.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input value={formTitle} onChange={(e) => setFormTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Platform</label>
                <Input value={formPlatform} onChange={(e) => setFormPlatform(e.target.value)} />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Price</label>
                <Input type="number" value={formPrice} onChange={(e) => setFormPrice(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Discount %</label>
                <Input type="number" value={formDiscount} onChange={(e) => setFormDiscount(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Stock</label>
                <Input type="number" value={formStock} onChange={(e) => setFormStock(Number(e.target.value))} />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={submitEdit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DELETE GAME DIALOG */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Game</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-medium">{selectedGame?.title}</span>?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
