import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Target, Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { Goal } from '../types/health';

interface GoalsManagerProps {
  goals: Goal[];
  onUpdateGoals: (goals: Goal[]) => void;
}

export function GoalsManager({ goals, onUpdateGoals }: GoalsManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Goal>>({});
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (goal: Goal) => {
    setEditingId(goal.id);
    setEditForm(goal);
  };

  const handleSave = () => {
    if (editingId && editForm.description && editForm.weeklyTarget) {
      const updatedGoals = goals.map(g =>
        g.id === editingId ? { ...g, ...editForm } as Goal : g
      );
      onUpdateGoals(updatedGoals);
      setEditingId(null);
      setEditForm({});
    }
  };

  const handleAdd = () => {
    if (editForm.description && editForm.weeklyTarget && editForm.type && editForm.unit) {
      const newGoal: Goal = {
        id: Date.now().toString(),
        type: editForm.type as Goal['type'],
        weeklyTarget: editForm.weeklyTarget,
        unit: editForm.unit,
        description: editForm.description
      };
      onUpdateGoals([...goals, newGoal]);
      setIsAdding(false);
      setEditForm({});
    }
  };

  const handleDelete = (id: string) => {
    onUpdateGoals(goals.filter(g => g.id !== id));
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setEditForm({});
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(10, 132, 255, 0.1)' }}>
            <Target className="w-6 h-6" style={{ color: '#0A84FF' }} />
          </div>
          <div>
            <h2>Manage Your Goals</h2>
            <p className="text-muted-foreground">Set flexible weekly intentions for your health</p>
          </div>
        </div>
        <Button onClick={() => setIsAdding(true)} disabled={isAdding}>
          <Plus className="w-4 h-4 mr-2" />
          Add Goal
        </Button>
      </div>

      <Card className="p-4 border-none" style={{ background: 'linear-gradient(135deg, rgba(10, 132, 255, 0.05) 0%, rgba(150, 230, 194, 0.08) 100%)' }}>
        <p className="italic text-foreground">
          💡 <strong>Why "budgets" not "targets"?</strong> Think of your goals as flexible weekly budgets—you're setting intentions for the week, not rigid daily pass/fail checkpoints. Some days you'll spend more of your energy budget, some days less. That's not failure, that's being human! This is about learning patterns, not achieving perfection. 🌈
        </p>
      </Card>

      {/* Add New Goal Form */}
      {isAdding && (
        <Card className="p-6 border-2 border-primary">
          <h3 className="mb-4">Add New Goal</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="new-type">Goal Type</Label>
              <select
                id="new-type"
                className="w-full p-2 rounded-md border border-border bg-background"
                value={editForm.type || ''}
                onChange={(e) => setEditForm({ ...editForm, type: e.target.value as Goal['type'] })}
              >
                <option value="">Select type...</option>
                <option value="sleep">Sleep</option>
                <option value="steps">Steps</option>
                <option value="mindfulness">Mindfulness</option>
                <option value="active">Active Minutes</option>
              </select>
            </div>

            <div>
              <Label htmlFor="new-description">Description</Label>
              <Input
                id="new-description"
                placeholder="e.g., Get 7 hours average sleep"
                value={editForm.description || ''}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="new-target">Weekly Target</Label>
                <Input
                  id="new-target"
                  type="number"
                  placeholder="e.g., 49"
                  value={editForm.weeklyTarget || ''}
                  onChange={(e) => setEditForm({ ...editForm, weeklyTarget: Number(e.target.value) })}
                />
              </div>

              <div>
                <Label htmlFor="new-unit">Unit</Label>
                <Input
                  id="new-unit"
                  placeholder="e.g., hours, steps"
                  value={editForm.unit || ''}
                  onChange={(e) => setEditForm({ ...editForm, unit: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAdd} className="flex-1">
                <Check className="w-4 h-4 mr-2" />
                Save Goal
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Existing Goals */}
      <div className="space-y-4">
        {goals.map((goal) => (
          <Card key={goal.id} className="p-6">
            {editingId === goal.id ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor={`edit-desc-${goal.id}`}>Description</Label>
                  <Input
                    id={`edit-desc-${goal.id}`}
                    value={editForm.description || goal.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`edit-target-${goal.id}`}>Weekly Target</Label>
                    <Input
                      id={`edit-target-${goal.id}`}
                      type="number"
                      value={editForm.weeklyTarget || goal.weeklyTarget}
                      onChange={(e) => setEditForm({ ...editForm, weeklyTarget: Number(e.target.value) })}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`edit-unit-${goal.id}`}>Unit</Label>
                    <Input
                      id={`edit-unit-${goal.id}`}
                      value={editForm.unit || goal.unit}
                      onChange={(e) => setEditForm({ ...editForm, unit: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSave} size="sm">
                    <Check className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ 
                        backgroundColor: goal.type === 'sleep' || goal.type === 'mindfulness' 
                          ? '#96E6C2' 
                          : '#0A84FF'
                      }}
                    />
                    <h4 className="capitalize">{goal.type} Goal</h4>
                  </div>
                  <p className="mb-1">{goal.description}</p>
                  <p className="text-muted-foreground">
                    Weekly target: {goal.weeklyTarget} {goal.unit}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(goal)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(goal.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {goals.length === 0 && !isAdding && (
        <Card className="p-8 text-center">
          <Target className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground mb-4">No goals set yet</p>
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Goal
          </Button>
        </Card>
      )}
    </div>
  );
}
